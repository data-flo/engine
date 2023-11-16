const rateLimit = require("../../utils/async/rate-limit.js");

const getSpreadsheetData = require("../../utils/google-api/get-spreadsheet-data.js");
const spreadsheetUrlToId = require("../../utils/google-api/spreadsheet-url-to-id.js");
const getClient = require("../../utils/google-api/get-glient.js");

const getRowIndices = require("../../utils/spreadsheets/get-row-indices.js");
const { Datatable } = require("../../types/datatable.js");
const generateRows = require("./utils/generate-rows.js");

module.exports = async function (args) {
  await rateLimit();
  const spreadsheetId = spreadsheetUrlToId(args.url);
  const authClient = await getClient();

  const spreadsheetData = await getSpreadsheetData(
    authClient,
    spreadsheetId,
    args["sheet name"],
    args.range,
  );

  const skippedRowIndices = getRowIndices(args.skip);

  const dataStream = generateRows(
    spreadsheetData,
    skippedRowIndices,
  );

  const data = await Datatable.createFromAsyncIterable(dataStream);

  return { data };

};

module.exports.manifest = require("./manifest.js");
