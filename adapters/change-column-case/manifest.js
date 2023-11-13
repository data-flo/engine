const { LetterCases } = require("../../enums.js");

module.exports = {
  "description": "Converts the case of text values in a datatable column.",
  "group": "Transform",
  "subgroup": "Data Tables",
  "input": [
    {
      "name": "data",
      "type": "datatable",
      "description": "The datatable containing the column to be converted.",
      "required": true,
    },
    {
      "name": "column",
      "type": "text",
      "description": "The column to be converted.",
      "required": true,
      "ui": { "column-in": "data" },
    },
    {
      "name": "case",
      "type": "text",
      "description": "One of the supported case patterns.",
      "required": true,
      "ui": { "must-be-one-of": LetterCases },
    },
  ],
  "output": [
    {
      "name": "data",
      "type": "datatable",
      "description": "A datatable with target column added.",
    },
  ],
};
