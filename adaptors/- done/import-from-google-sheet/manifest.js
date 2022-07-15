module.exports = {
  "description": "Imports data from a Google Sheets spreadsheet.\nPrivate spreadsheets should be shared with `data-flo@data-flo.iam.gserviceaccount.com`.",
  "group": "Transformations",
  "subgroup": "Data Sources",
  "input": [
    {
      "name": "url",
      "type": "text",
      "description": "The URL of the Google Sheets spreadsheet.\nPrivate sheets should be shared with `data-flo@data-flo.iam.gserviceaccount.com`.",
      "required": true,
    },
    {
      "name": "sheet name",
      "type": "text",
      "description": "The title of sheet (tab) from which data will be imported.\nIf unspecified, the first sheet in the spreadsheet will be imported.",
      "required": false,
    },
    {
      "name": "range",
      "type": "text",
      "description": "A valid range of cells (e.g. `A1:L512`) that contain data.\nIf unspecified, the whole sheet will be included.",
      "required": false,
    },
    {
      "name": "skip",
      "type": "list",
      "description": "A list of row numbers to be ignored.\nIf unspecified, then all rows in the range will be imported.",
      "required": false,
    },
  ],
  "output": [
    {
      "name": "data",
      "type": "datatable",
      "description": "A datatable containing the imported data.",
    },
  ],
};
