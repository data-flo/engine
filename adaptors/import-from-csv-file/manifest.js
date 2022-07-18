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
      "required": false,
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
      "required": false,
      "default": true,
    },
    {
      "name": "column names",
      "type": "list",
      "description": "List of column names to be added. If unspecified, first row of the file will be used as column names.",
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
