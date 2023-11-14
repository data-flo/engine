module.exports = {
  "description": "Exports data to an existing Google Sheets spreadsheet.\nPrivate spreadsheets should be shared with `data-flo@data-flo.iam.gserviceaccount.com` and given `can edit` permission.",
  "group": "Export",
  "subgroup": "Data Destinations",
  "input": [
    {
      "name": "data",
      "type": "datatable",
      "description": "The data to be exported to the Google Sheets.",
      "required": true,
    },
    {
      "name": "url",
      "type": "text",
      "description": "A valid URL of a Google Spreadsheet to be updated.\nThe Spreadsheet should be shared with `data-flo@data-flo.iam.gserviceaccount.com` and given `can edit` permission.",
      "required": true,
    },
    {
      "name": "sheet name",
      "type": "text",
      "description": "The title of the sheet (tab) to which data will be exported.\nIf unspecified, the first sheet in the spreadsheet will be used.",
      "required": false,
    },
    {
      "name": "header row",
      "type": "number",
      "description": "The row number of the sheet row which contains column headers.\nIf unspecified, it defaults to `1` (the first row).",
      "required": false,
      "default": 1,
    },
    {
      "name": "id column",
      "type": "text",
      "description": "The name of the column that contains the unique row IDs shared by `data` and the Google Sheets spreadsheet.",
      "required": true,
    },
    {
      "name": "append rows",
      "type": "boolean",
      "description": "When set to `False, only existing rows will be updated. When set to `True`, existing rows will be updated and new (non-existing) rows will be added to the end of the Google Sheets spreadsheet.\nIf unspecified, defaults to `True`.",
      "required": false,
      "default": true,
    },
    {
      "name": "append columns",
      "type": "boolean",
      "description": "When set to `False, only existing columns will be updated. When set to `True`, existing columns will be updated and new (non-existing) columns will be added to the end of the Google Sheets spreadsheet.\nIf unspecified, defaults to `True`.",
      "required": false,
      "default": true,
    },
    {
      "name": "resize sheet",
      "type": "boolean",
      "description": "Specifies whether to resize the Google Sheets spreadsheet when more rows and columns are needed.\nIf unspecified, defaults to `True`.",
      "required": false,
      "default": true,
    },
  ],
  "output": [
    {
      "name": "updated row ids",
      "type": "list",
      "description": "A list of existing row IDs which have been updated.",
    },
    {
      "name": "created row ids",
      "type": "list",
      "description": "A list of new row IDs which have been created when `append rows` is set to `True`.",
    },
    {
      "name": "skipped row ids",
      "type": "list",
      "description": "A list of row IDs which in `data` which are missing from the Google Sheets spreadsheet when `append rows` is set to `False`.",
    },
    {
      "name": "appended columns",
      "type": "list",
      "description": "A list of columns appended to the Google Sheets spreadsheet when `append columns` is set to `True`.",
    },
  ],
};
