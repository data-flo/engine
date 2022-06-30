const { FileEncodings, CommonDelimiters } = require("../../enums");

module.exports = {
  "description": "Imports a CSV file and converts to a datatable.",
  "category": "Data Tables",
  "input": [
    {
      "name": "file",
      "type": "file",
      "description": "A file containing a .csv or .tsv formatted data.",
    },
    {
      "name": "encoding",
      "type": "text",
      "default": "utf8",
      "description": "The character encoding of the input `file`.\nDefaults to `utf8`.",
      "enum": FileEncodings,
    },
    {
      "name": "delimiter",
      "type": "text",
      "default": ",",
      "description": "Character used as column delimiter. Defaults to \",\" (comma).",
      "enum": CommonDelimiters,
    },
    {
      "name": "trim",
      "type": "boolean",
      "default": true,
      "description": "Specifies whether to ignore whitespace characters immediately around the separator.\nDefaults to True.",
    },
    {
      "name": "columns",
      "type": "list",
      "default": null,
      "description": "",
    },
  ],
  "output": [
    {
      "name": "data",
      "type": "datatable",
      "description": "A DataTable containing columns and rows.",
    },
  ],
};
