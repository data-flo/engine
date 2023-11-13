const { FileEncodings } = require("../../enums.js");

module.exports = {
  "description": "Imports text from a file.",
  "group": "Transform",
  "subgroup": "Text Manipulation",
  "input": [
    {
      "name": "file",
      "type": "file",
      "description": "The text file to be imported.",
      "required": true,
    },
    {
      "name": "encoding",
      "type": "text",
      "description": "The character encoding of the output `text`.\nIf unspecified, defaults to `utf8`.",
      "required": false,
      "default": "utf8",
      "ui": { "must-be-one-of": FileEncodings },
    },
  ],
  "output": [
    {
      "name": "text",
      "type": "text",
      "description": "The content of the text file.",
    },
  ],
};
