const sleep = require("../../utils/async/sleep");

const getClient = require("./utils/get-client");
const getSheetData = require("./utils/get-sheet-data");
const getSheetProperties = require("./utils/get-sheet-properties");
const getSheetRange = require("./utils/get-sheet-range");
const rewriteUrl = require("./utils/rewrite-url");

let lastRun = 0;

module.exports = async function (args) {
  const spreadsheetId = rewriteUrl(args.url);

  if ((new Date()).getTime() - lastRun < 1000) {
    await sleep();
  }

  lastRun = new Date().getTime();

  const authClient = await getClient();
  try {
    const sheetProps = await getSheetProperties(authClient, spreadsheetId, args.sheetname);
    const range = getSheetRange(sheetProps, args.range);

    const sheetData = await getSheetData(authClient, spreadsheetId, range.address);

    const columns = sheetData[0];
    const rows = [];
    if (sheetData.length > 1) {
      const startRowIndex = parseInt(range.fromRow, 10);
      const skippedRowIndices = args.skip ? new Set(args.skip.map((x) => parseInt(x, 10))) : null;

      for (let index = 1; index < sheetData.length; index++) {
        if (skippedRowIndices?.has(startRowIndex + index)) {
          continue;
        }
        const row = {};
        for (let columnIndex = 0; columnIndex < columns.length; columnIndex++) {
          row[columns[columnIndex]] = sheetData[index][columnIndex];
        }
        rows.push(row);
      }
    }

    return {
      data: {
        columns,
        rows,
      },
      rows: sheetProps.gridProperties.rowCount,
      columns: sheetProps.gridProperties.columnCount,
    };
  }
  catch (error) {
    if (error.message === "The caller does not have permission") {
      throw new Error(`Cannot access Google Spreadsheet ${args.url}. Make sure it has been shared with ${authClient.email}.`);
    }
    throw error;
  }
};

module.exports.manifest = require("./manifest");
