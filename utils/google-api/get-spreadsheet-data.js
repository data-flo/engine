const getSheetRange = require("../spreadsheets/get-sheet-range");

const getSheetProperties = require("./get-sheet-properties");
const getSheetValues = require("./get-sheet-values");

module.exports = async function getSpreadsheetData(authClient, spreadsheetId, sheetName, range = undefined) {
  try {
    const sheetProps = await getSheetProperties(authClient, spreadsheetId, sheetName);
    const sheetRange = getSheetRange(sheetProps, range);
    const sheetValues = await getSheetValues(authClient, spreadsheetId, sheetRange.address);
    return {
      sheetProps,
      sheetRange,
      sheetValues,
    };
  }
  catch (error) {
    if (error.message === "The caller does not have permission") {
      throw new Error(
        `Cannot access Google Spreadsheet ${spreadsheetId}. Make sure it has been shared with ${authClient.email}.`
      );
    }
    throw error;
  }
};
