const getClient = require("../../../utils/google-api/get-glient");
const getSheetRange = require("../../../utils/spreadsheets/get-sheet-range");

const getSheetProperties = require("./get-sheet-properties");
const getSheetValues = require("./get-sheet-values");
const rewriteUrl = require("./rewrite-url");

module.exports = async function getData(url, sheetname, range) {
  const spreadsheetId = rewriteUrl(url);

  const authClient = await getClient();
  try {
    const sheetProps = await getSheetProperties(authClient, spreadsheetId, sheetname);
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
        `Cannot access Google Spreadsheet ${url}. Make sure it has been shared with ${authClient.email}.`
      );
    }
    throw error;
  }
};
