module.exports = {
  "description": "Loads data from a Google Spreadsheet.\nPrivate sheets should be shared to with `data-flo@data-flo.iam.gserviceaccount.com`.",
  "group": "Transformations",
  "subgroup": "Data Sources",
  "input": [
    {
      "name": "url",
      "type": "url",
      "description": "A valid URL of a Google Spreadsheet.\nPrivate sheets should be shared to with `data-flo@data-flo.iam.gserviceaccount.com`."
    },
    {
      "name": "sheetname",
      "type": "text",
      "description": "The title of Sheet to which the data will be written.\nIf unspecified, `sheet` defaults to the first sheet in the spreadsheet.",
      "default": null
    },
    {
      "name": "range",
      "type": "text",
      "description": "A valid sheet range which contains data.\nIf unspecified, the whole sheet will be included.",
      "default": null
    },
    {
      "name": "skip",
      "type": "list",
      "description": "A list of row indices to be ignored.\nIf unspecified, the all rows in the range will be included.",
      "default": null
    },
    {
      "name": "cache",
      "type": "number",
      "description": "Specifies for how long (in hours) to cache the results. Defaults to `0` (do not cache).",
      "default": 0
    }
  ],
  "output": [
    {
      "name": "data",
      "type": "datatable",
      "description": "The data loaded from the specified Google Spreadsheet."
    }
  ]
}