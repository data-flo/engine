const NormalisedMap = require("../../utils/structures/normalised-map.js");
const NormalisedSet = require("../../utils/structures/normalised-set.js");

const createTextNormaliser = require("../../utils/text/create-text-normaliser.js");

const { Datatable } = require("../../types/datatable.js");

function createMap(
  matchCase,
  matchDiacritics,
) {
  if (matchCase || matchDiacritics) {
    return new NormalisedMap(createTextNormaliser(matchCase, matchDiacritics));
  }
  return new Map();
}

function createSet(
  matchCase,
  matchDiacritics,
) {
  if (matchCase || matchDiacritics) {
    return new NormalisedSet(createTextNormaliser(matchCase, matchDiacritics));
  }
  return new Set();
}

module.exports = async function adaptorJoinDatatable(args) {
  const leftTable = args["main data"];
  const rightTable = args["other data"];
  const leftIdColumn = args["main column"];
  const rightIdColumn = args["other column"] || args["main column"];

  const leftColumns = await leftTable.getColumns();
  if (!leftColumns.includes(leftIdColumn)) {
    throw new Error(`Main datatable does not include a column named \`${leftIdColumn}\``);
  }

  const rightColumns = await rightTable.getColumns();
  if (!rightColumns.includes(rightIdColumn)) {
    throw new Error(`Other datatable does not include a column named \`${rightIdColumn}\``);
  }

  const joinedColumnNames = [];
  for (const columnName of leftColumns) {
    joinedColumnNames.push({ key: columnName, header: columnName });
  }
  for (const columnName of (args.columns || rightColumns)) {
    if (!rightColumns.includes(columnName)) {
      throw new Error(`Other datatable does not include a column named \`${columnName}\``);
    }
    if (leftColumns.includes(columnName)) {
      throw new Error(`Main datatable already includes a column named \`${columnName}\``);
    }
    joinedColumnNames.push({ key: columnName, header: `${args.prefix || ""}${columnName}` });
  }

  // Read other table and store its rows
  const rightRowsMap = createMap(
    args["match case"],
    args["match diacritics"],
  );

  // eslint-disable-next-line no-lone-blocks
  {
    const rightTableReader = (
      args.columns
        ?
        rightTable.getPartialReader(args.columns)
        :
        rightTable.getReader()
    );
    for await (const row of rightTableReader) {
      if (row[rightIdColumn] && !rightRowsMap.get(row[rightIdColumn])) {
        rightRowsMap.set(row[rightIdColumn], row);
      }
    }
  }

  const dataWriter = await Datatable.create({ columns: joinedColumnNames });
  const unmatchedWriter = await Datatable.create({ columns: leftColumns });

  const isFullJoin = (args["join type"] === "Full Join");
  const isLeftJoin = (args["join type"] === "Left Join");
  const matchedValues = createSet(
    args["match case"],
    args["match diacritics"],
  );

  for await (const leftRow of leftTable.getReader()) {
    const rightRow = (
      leftRow[leftIdColumn]
        ?
        rightRowsMap.get(leftRow[leftIdColumn])
        :
        undefined
    );

    if (rightRow) {
      dataWriter.write({ ...leftRow, ...rightRow });
      if (isFullJoin && leftRow[leftIdColumn]) {
        matchedValues.add(leftRow[leftIdColumn]);
      }
    }
    else if (isLeftJoin || isFullJoin) {
      dataWriter.write(leftRow);
    }
    else {
      unmatchedWriter.write(leftRow);
    }
  }

  if (isFullJoin) {
    for (const [ rightValue, rightRow ] of rightRowsMap.entries()) {
      if (!matchedValues.has(rightValue)) {
        dataWriter.write(rightRow);
      }
    }
  }

  dataWriter.end();
  unmatchedWriter.end();

  // const data = await dataWriter.finalise();
  // const unmatched = await unmatchedWriter.finalise();

  const [ data, unmatched ] = await Promise.all([
    dataWriter.finalise(),
    unmatchedWriter.finalise(),
  ]);

  return {
    data,
    unmatched,
  };
};

module.exports.manifest = require("./manifest.js");
