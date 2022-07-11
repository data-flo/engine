const { FileEncodings, CommonDelimiters } = require("../../enums");

module.exports = {
  "description": "Imports a CSV file and converts to a datatable.",
  "group": "Transformations",
  "subgroup": "Data Tables",
  "input": [
    {
      "name": "file",
      "type": "file",
      "description": "A file containing [Comma-separated values](https://en.wikipedia.org/wiki/Comma-separated_values) or delimited text.",
      "required": true,
    },
    {
      "name": "encoding",
      "type": "text",
      "description": "The character encoding of the input `file`.\nDefaults to `utf8`.",
      "required": true,
      "default": "utf8",
      "ui": { "must-be-one-of": FileEncodings },
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
      "name": "trim",
      "type": "boolean",
      "description": "Specifies whether to ignore whitespace characters immediately around the separator.\nDefaults to True.",
      "required": true,
      "default": true,
    },
    {
      "name": "columns",
      "type": "list",
      "description": "",
      "required": true,
      "default": null,
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
