const rateLimit = require("../../utils/async/rate-limit");

const getData = require("./utils/get-data");
const generateRows = require("./utils/generate-rows");

const { Datatable } = require("../../types/datatable");

function getSkippedRowIndices(skip) {
  if (skip) {
    return new Set(skip.map((x) => parseInt(x, 10)));
  }
  return undefined;
}

module.exports = async function (args) {
  await rateLimit();

  const sheetData = await getData(
    args.url,
    args.sheetname,
    args.range,
  );

  const skippedRowIndices = getSkippedRowIndices(args.skip);

  const dataStream = generateRows(sheetData, skippedRowIndices);

  const data = await Datatable.createFromAsyncIterable(dataStream);

  return { data };

};

module.exports.manifest = require("./manifest");
