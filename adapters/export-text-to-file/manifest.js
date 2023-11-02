const { FileEncodings } = require("../../enums.js");

module.exports = {
  "description": "Exports text to a file.",
  "group": "Transform",
  "subgroup": "Text Manipulation",
  "input": [
    {
      "name": "text",
      "type": "text",
      "description": "The text to be exported as a file.",
      "required": true,
    },
    {
      "name": "encoding",
      "type": "text",
      "description": "The character encoding of the exported text file.\nIf unspecified, defaults to `utf8`.",
      "required": false,
      "default": "utf8",
      "ui": { "must-be-one-of": FileEncodings },
    },
    {
      "name": "output file name",
      "type": "text",
      "description": "The name of the output file.\nIf unspecified, defaults to `file.txt`.",
      "required": false,
      "default": "file.txt",
    },
  ],
  "output": [
    {
      "name": "file",
      "type": "file",
      "description": "The exported text file.",
    },
  ],
};
