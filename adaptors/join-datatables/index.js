const CaseInsensitiveMap = require("cgps-utils/case-insensitive-map");

const { Datatable } = require("../../types/datatable");

module.exports = async function adaptorJoinDatatable(args) {
  const leftTable = args["main data"];
  const rightTable = args["other data"];
  const leftIdColumn = args["main column"];
  const rightIdColumn = args["other column"] || args["main column"];

  const leftColumns = await leftTable.getColumns();
  if (!leftColumns.includes(leftIdColumn)) {
    throw new Error(`Main datatable does not include a column named '${leftIdColumn}'`);
  }

  const rightColumns = await rightTable.getColumns();
  if (!rightColumns.includes(rightIdColumn)) {
    throw new Error(`Other datatable does not include a column named '${rightIdColumn}'`);
  }

  const joinedColumnNames = Array.from(
    new Set([
      ...leftColumns,
      ...rightColumns,
    ])
  );

  // const joinedColumnMap = new Map();
  // const joinedColumnNames = [];
  // if (args.columns) {
  //   for (const [ oldName, newName ] of args.columns) {
  //     if (args.overwrite === true || !leftTable.columns.includes(newName)) {
  //       joinedColumnMap.set(oldName, newName);
  //       joinedColumnNames.push(newName);
  //     }
  //   }
  // }
  // else {
  //   const columns = rightTable.columns.filter((x) => args.overwrite === true || !leftTable.columns.includes(x));
  //   for (const columnName of columns) {
  //     joinedColumnMap.set(columnName, columnName);
  //     joinedColumnNames.push(columnName);
  //   }
  // }

  // Read other table and store its rows
  const rightRows = !args["case sensitive"] ? new CaseInsensitiveMap() : new Map();
  {
    const rightTableReader = (
      args.columns
        ?
        rightTable.getPartialReader(args.columns)
        :
        rightTable.getReader(args.columns)
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
