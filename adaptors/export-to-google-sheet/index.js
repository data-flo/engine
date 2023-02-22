import checkSheetSize  from "./utils/check-sheet-size";
import getClient  from "../google-spreadsheet/utils/get-client";
import getSheetData  from "../google-spreadsheet/utils/get-sheet-data";
import getSheetProperties  from "../google-spreadsheet/utils/get-sheet-properties";
import getSheetRange  from "../google-spreadsheet/utils/get-sheet-range";
import mergeData  from "./utils/merge-data";
import rewriteUrl  from "../google-spreadsheet/utils/rewrite-url";
import updateSheetData  from "./utils/update-sheet-data";








export default async function (args) {
  if (!args.data.hasColumn(args["id column"])) {
    throw new Error(`datatable does not include a column named '${args["id column"]}'`);
  }

  const spreadsheetId = rewriteUrl(args.url);
  const authClient = await getClient();
  try {
    const sheetProps = await getSheetProperties(authClient, spreadsheetId, args.sheetname);
    const range = getSheetRange(sheetProps);
    const sheetData = await getSheetData(authClient, spreadsheetId, range.address);

    const [ cellUpdates, updatedRowIds, createdRowId, skippedRowIds ] = mergeData(sheetData, args);

    await checkSheetSize(authClient, spreadsheetId, sheetProps, cellUpdates, args["resize sheet"]);

    const updated = await updateSheetData(authClient, spreadsheetId, sheetProps, cellUpdates);

    return {
      "updated cells": updated.totalUpdatedCells || 0,
      updated: updatedRowIds,
      created: createdRowId,
      skipped: skippedRowIds,
      data: args.data,
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
