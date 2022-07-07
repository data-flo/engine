const { CommonDelimiters } = require("../../enums");

module.exports = {
  "description": "Converts delimited text (e.g. comma-separated values) to a datatable.",
  "group": "Transformations",
  "subgroup": "Data Tables",
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
      "description": "Character used as column delimiter. Defaults to \",\" (comma).",
      "required": false,
      "default": ",",
      "ui": { "can-be-one-of": CommonDelimiters },
    },
  ],
  "output": [
    {
      "name": "data",
      "type": "datatable",
      "description": "A new datatable.",
    },
  ],
};
