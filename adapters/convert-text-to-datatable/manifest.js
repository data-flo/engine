const { CommonDelimiters, CommonLineEndings } = require("../../enums.js");

module.exports = {
  "description": "Converts delimited text (e.g. comma-separated values) to a datatable.",
  "group": "Transform",
  "subgroup": "Text Manipulation",
  "input": [
    {
      "name": "csv",
      "type": "text",
      "description": "The text to be converted to datatable.",
      "required": true,
    },
    {
      "name": "delimiter",
      "type": "text",
      "description": "Character used as column delimiter.\nIf unspecified, defaults to \",\" (comma).",
      "required": false,
      "default": ",",
      "ui": { "can-be-one-of": CommonDelimiters },
    },
    {
      "name": "newline",
      "type": "text",
      "description": "Character used as line separator.\nIf unspecified, defaults to `\\n` (newline).",
      "required": false,
      "default": "\n",
      "ui": { "can-be-one-of": CommonLineEndings },
    },
    {
      "name": "trim",
      "type": "boolean",
      "description": "Specifies whether to ignore whitespace characters immediately around the separator.\nIf unspecified, defaults to `True`.",
      "required": false,
      "default": true,
    },
    {
      "name": "columns",
      "type": "list",
      "description": "List of column names to be added. If unspecified, first row of the file will be used as column names.",
      "required": false,
    },

  ],
  "output": [
    {
      "name": "data",
      "type": "datatable",
      "description": "A datatable.",
    },
  ],
};
