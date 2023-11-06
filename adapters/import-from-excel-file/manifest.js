module.exports = {
  "description": "Imports data from an Excel file in XLSX format.",
  "group": "Import",
  "subgroup": "Data Sources",
  "input": [
    {
      "name": "file",
      "type": "file",
      "description": "The spreadsheet file in Office Open XML SpreadsheetML file format (`.xlsx`).",
      "required": true,
    },
    {
      "name": "sheet name",
      "type": "text",
      "description": "The name of the sheet (tab) from which to import the data.\nIf unspecified, the first sheet will be used.",
      "required": false,
    },
    {
      "name": "range",
      "type": "text",
      "description": "A valid range of cells (e.g. `A1:L512`) that contain data.\nIf unspecified, the whole sheet will be included.",
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
