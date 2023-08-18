const getSpreadsheetData = require("../../utils/google-api/get-spreadsheet-data");
const spreadsheetUrlToId = require("../../utils/google-api/spreadsheet-url-to-id");
const getClient = require("../../utils/google-api/get-glient");

const checkSheetSize = require("./utils/check-sheet-size");
const mergeData = require("./utils/merge-data");
const updateSheetData = require("./utils/update-sheet-data");

module.exports = async function (args) {
  await args.data.shouldIncludeColumns(args["id column"]);

  const spreadsheetId = spreadsheetUrlToId(args.url);
  const authClient = await getClient();

  const spreadsheetData = await getSpreadsheetData(
    authClient,
    spreadsheetId,
    args.sheetname,
  );

  const [ cellUpdates, updatedRowIds, createdRowId, skippedRowIds ] = await mergeData(
    spreadsheetData.sheetValues,
    args.data,
    args["id column"],
    args["header row"],
    args["append rows"],
    args["append columns"],
  );

  await checkSheetSize(
    authClient,
    spreadsheetId,
    spreadsheetData.sheetProps,
    cellUpdates,
    args["resize sheet"],
  );

  const updated = await updateSheetData(
    authClient,
    spreadsheetId,
    spreadsheetData.sheetProps,
    cellUpdates,
  );

  return {
    "data": args.data,
    "updated cells": updated.totalUpdatedCells || 0,
    "updated row ids": updatedRowIds,
    "created row ids": createdRowId,
    "skipped row ids": skippedRowIds,
  };
};

module.exports.manifest = require("./manifest.js");
