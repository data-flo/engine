const { google } = require("googleapis");

const getClient = require("../../../utils/google-drive/get-glient");
const getSheetRange = require("../../../utils/spreadsheets/get-sheet-range");

const getSheetProperties = require("./get-sheet-properties");
const rewriteUrl = require("./rewrite-url");

async function getSheetValues(auth, spreadsheetId, range) {
  const sheets = google.sheets({ version: "v4", auth });
  const res = await Promise.all([
    sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    }),
    new Promise((resolve) => setTimeout(resolve, 1000)),
  ]);
  return res[0].data.values || [];
}

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
