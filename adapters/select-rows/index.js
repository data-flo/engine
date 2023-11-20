const { Datatable } = require("../../types/datatable");

module.exports = async function (args) {
  let totalRows = 0;

  if (args.begin === 0) {
    throw new Error("The position of the first row cannot be zero.");
  }

  if (args.end === 0) {
    throw new Error("The position of the last row cannot be zero.");
  }

  if (args.begin < 0 || args.end < -1) {
    totalRows = await args.data.getNumberOfRows();
  }

  let firstRowNumber = args.begin;
  if (args.begin < 0) {
    firstRowNumber = totalRows + args.begin + 1;
  }

  let lastRowNumber = args.end;
  if (args.end < 0) {
    if (args.end === -1) {
      lastRowNumber = Number.MAX_SAFE_INTEGER;
    }
    else {
      lastRowNumber = totalRows + args.end + 1;
    }
  }

  if (lastRowNumber < firstRowNumber) {
    throw new Error("The position of the last row should be greater than or equal to the position of the first row.");
  }

  const dataWriter = await Datatable.create();
  let currentRowNumber = 0;
  let numberOfSelectedRows = 0;
  const hasLimit = (args.limit > 0);
  for await (const row of args.data.getReader()) {
    currentRowNumber += 1;
    if (
      currentRowNumber >= firstRowNumber
      &&
      currentRowNumber <= lastRowNumber
      &&
      (
        !hasLimit
        ||
        numberOfSelectedRows < args.limit
      )
    ) {
      numberOfSelectedRows += 1;
      dataWriter.write(row);
    }
  }

  dataWriter.end();

  const data = await dataWriter.finalise();

  return { data };
};

module.exports.manifest = require("./manifest.js");
