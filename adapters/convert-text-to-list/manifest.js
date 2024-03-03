const { CommonLineEndings } = require("../../enums");

module.exports = {
  "description": "Converts a text into a list by spliting it using a specified separator to determine where to make each split.",
  "group": "Transform",
  "subgroup": "Text Manipulation",
  "input": [
    {
      "name": "text",
      "type": "text",
      "description": "The text to be converted.",
      "required": true,
    },
    {
      "name": "separator",
      "type": "text",
      "description": "The separator text, or regular expression, which denotes the points at which each split should occur. \nThe separator is treated as a regular expression if it begins and ends with `/`.\nIf unspecified, defaults to `\\n` (newline).",
      "required": false,
      "default": "\n",
      "ui": { "can-be-one-of": CommonLineEndings },
    },
    {
      "name": "limit",
      "type": "number",
      "description": "A positive integer specifying a limit on the number of splits to be found.\nIf unspecified, defaults to `null` (no limit).",
      "required": false,
      "ui": { "integer": true },
    },
  ],
  "output": [
    {
      "name": "list",
      "type": "list",
      "description": "A list of texts split at each point where the separator occurs in the input text, or an empty list if no occurrences found.",
    },
  ],
};
