module.exports = {
  "description": "Saves data to a Google Spreadsheet.\nThe Spreadsheet should be shared to with `data-flo@data-flo.iam.gserviceaccount.com` and given `can edit` permission.",
  "group": "Transformations",
  "subgroup": "Data Destinations",
  "input": [
    {
      "name": "url",
      "type": "url",
      "description": "A valid URL of a Google Spreadsheet to be updated.\nThe Spreadsheet should be shared to with `data-flo@data-flo.iam.gserviceaccount.com` and given `can edit` permission."
    },
    {
      "name": "sheetname",
      "type": "text",
      "description": "The title of Sheet to which the data will be written.\nIf unspecified, `sheet` defaults to the first sheet in the spreadsheet.",
      "default": null
    },
    {
      "name": "header row",
      "type": "number",
      "description": "The index of the sheet row which contains column headers.\nIf unassigned, `header row` defaults to `1` (the first row).",
      "default": 1
    },
    {
      "name": "data",
      "type": "datatable",
      "description": "The data to be appended to the Google Spreadsheet."
    },
    {
      "name": "id column",
      "type": "text",
      "description": "The name of the ID column in `data` and in the Google Spreadsheet."
    },
    {
      "name": "append rows",
      "type": "boolean",
      "description": "Specifies whether to create a new row when it is missing from the Google Spreadsheet. Defaults to `True`.",
      "default": true
    },
    {
      "name": "append columns",
      "type": "boolean",
      "description": "Specifies whether to create a column when it is missing from the Google Spreadsheet.\nDefaults to `True`.",
      "default": true
    },
    {
      "name": "resize sheet",
      "type": "boolean",
      "description": "Specifies whether to resize the Google Spreadsheet when more rows and columns are needed.\nDefaults to `True`.",
      "default": true
    }
  ],
  "output": [
    {
      "name": "updated",
      "type": "list",
      "description": "A list of row IDs which have been updated."
    },
    {
      "name": "created",
      "type": "list",
      "description": "A list of row IDs which have been appended when `append rows` is set to `True`."
    },
    {
      "name": "skipped",
      "type": "list",
      "description": "A list of row IDs which are missing from the Google Spreadsheet."
    },
    {
      "name": "data",
      "type": "datatable",
      "description": "The data appended to the Google Spreadsheet."
    }
  ]
}