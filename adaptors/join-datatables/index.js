const CaseInsensitiveMap = require("cgps-utils/case-insensitive-map");

const { Datatable } = require("../../types/datatable");

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
  const rightRows = !args["case sensitive"] ? new CaseInsensitiveMap() : new Map();
  {
    const rightTableReader = (
      args.columns
        ?
        rightTable.getPartialReader(args.columns)
        :
        rightTable.getReader()
    );
    for await (const row of rightTableReader) {
      if (row[rightIdColumn]) {
        rightRows.set(row[rightIdColumn], row);
      }
    }
  }

  const dataWriter = await Datatable.create({ columns: joinedColumnNames });
  const skippedWriter = await Datatable.create({ columns: leftColumns });

  const isNotInnerJoin = (args["inner join"] === false);

  for await (const leftRow of leftTable.getReader()) {
    const rightRow = (
      leftRow[leftIdColumn]
        ?
        rightRows.get(leftRow[leftIdColumn])
        :
        undefined
    );

    if (rightRow) {
      dataWriter.write({ ...leftRow, ...rightRow });
    }
    else if (isNotInnerJoin) {
      dataWriter.write(leftRow);
    }
    else {
      skippedWriter.write(leftRow);
    }
  }

  dataWriter.end();
  skippedWriter.end();

  const data = await dataWriter.finalise();
  const skipped = await skippedWriter.finalise();

  // const [ data, skipped ] = await Promise.all([
  //   datatWriter.finalise(),
  //   skippedWriter.finalise(),
  // ]);

  return {
    data,
    skipped,
  };
};

module.exports.manifest = require("./manifest");
