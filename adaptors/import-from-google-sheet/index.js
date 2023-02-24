const rateLimit = require("../../utils/async/rate-limit");
const getSpreadsheetData = require("../../utils/google-api/get-spreadsheet-data");
const spreadsheetUrlToId = require("../../utils/google-api/spreadsheet-url-to-id");
const getClient = require("../../utils/google-api/get-glient");

const { Datatable } = require("../../types/datatable");

const generateRows = require("./utils/generate-rows");

function getSkippedRowIndices(skip) {
  if (skip) {
    return new Set(skip.map((x) => parseInt(x, 10)));
  }
  return undefined;
}

module.exports = async function (args) {
  await rateLimit();
  const spreadsheetId = spreadsheetUrlToId(args.url);
  const authClient = await getClient();

  const spreadsheetData = await getSpreadsheetData(
    authClient,
    spreadsheetId,
    args.sheetname,
    args.range,
  );

  const skippedRowIndices = getSkippedRowIndices(args.skip);

  const dataStream = generateRows(
    spreadsheetData,
    skippedRowIndices,
  );

  const data = await Datatable.createFromAsyncIterable(dataStream);

  return { data };

};

module.exports.manifest = require("./manifest");
