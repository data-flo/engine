import sleep  from "../../utils/async/sleep";
import getClient  from "./utils/get-client";
import getSheetData  from "./utils/get-sheet-data";
import getSheetProperties  from "./utils/get-sheet-properties";
import getSheetRange  from "./utils/get-sheet-range";
import rewriteUrl  from "./utils/rewrite-url";







let lastRun = 0;

export default async function (args) {
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

export { default as manifest } from "./manifest";
