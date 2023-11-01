const { CommonDelimiters } = require("../../enums.js");

module.exports = {
  "description": "Exports a datatable to a CSV file.",
  "group": "Export",
  "subgroup": "Data Tables",
  "input": [
    {
      "name": "data",
      "type": "datatable",
      "description": "The datatable to be exported.",
      "required": true,
    },
    {
      "name": "delimiter",
      "type": "text",
      "description": "Character used as column delimiter. Defaults to \",\" (comma).",
      "required": false,
      "default": ",",
      "ui": { "can-be-one-of": CommonDelimiters },
    },
    {
      "name": "columns",
      "type": "list",
      "description": "A list of columns to be exported to the CSV file.\nIf unspecified, all columns will be exported.",
      "required": false,
    },
    {
      "name": "output file name",
      "type": "text",
      "description": "The name of the output file.\nIf unspecified, defaults to `data.csv`.",
      "required": false,
      "default": "data.csv",
    },
  ],
  "output": [
    {
      "name": "file",
      "type": "file",
      "description": "A file in CSV format.",
    },
  ],
};
