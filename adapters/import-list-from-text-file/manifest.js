const { FileEncodings, CommonLineEndings } = require("../../enums");

module.exports = {
  "description": "Imports a list from a text file.",
  "group": "Transformations",
  "subgroup": "Data Tables",
  "input": [
    {
      "name": "file",
      "type": "file",
      "description": "The text file to be converted.",
      "required": true,
    },
    {
      "name": "encoding",
      "type": "text",
      "description": "The character encoding of the input `file`.\nIf unspecified, defaults to `utf8`.",
      "required": false,
      "default": "utf8",
      "ui": { "must-be-one-of": FileEncodings },
    },
    {
      "name": "separator",
      "type": "text",
      "description": "Character used as line separator.\nIf unspecified, defaults to `\\n` (newline).",
      "required": false,
      "default": "\n",
      "ui": { "can-be-one-of": CommonLineEndings },
    },
    {
      "name": "trim",
      "type": "boolean",
      "description": "Specifies whether to ignore whitespace characters immediately around the separator.\nIf unspecified, defaults to True.",
      "required": false,
      "default": true,
    },
  ],
  "output": [
    {
      "name": "list",
      "type": "list",
      "description": "A list of values.",
    },
  ],
};
