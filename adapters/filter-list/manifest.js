const { FilterTypes } = require("../../enums.js");

module.exports = {
  "description": "Finds values in a list that match a pattern.",
  "group": "Transform",
  "subgroup": "List Manipulation",
  "input": [
    {
      "name": "list",
      "type": "list",
      "description": "The list to be filtered.",
      "required": true,
    },
    {
      "name": "filter type",
      "type": "text",
      "description": "The type of filter applied.",
      "required": true,
      "default": "equals",
      "ui": { "must-be-one-of": FilterTypes },
    },
    {
      "name": "filter value",
      "type": "text",
      "description": "A text or a regular expression to be searched for within the datatable columns. For when a range is needed, please use this format: number,number",
      "required": false,
    },
    {
      "name": "match diacritics",
      "type": "boolean",
      "description": "When set to `True`, letters with and without diacritics are treated as equivalent when matching values, e.g. `Perú` = `Peru`.\nIf unspecified, defaults to `True`.",
      "required": false,
      "default": false,
    },
    {
      "name": "case sensitive",
      "type": "boolean",
      "description": "When set to `True`, lowercase and uppercase letters are treated as different when comparing text values. When set to `False`, lowercase and uppercase letters are treated as equivalent. If unspecified, defaults to `False`",
      "required": false,
      "default": false,
    },
  ],
  "output": [
    {
      "name": "values",
      "type": "list",
      "description": "A list with the values that match the testing pattern.",
    },
    {
      "name": "complementary",
      "type": "list",
      "description": "A list with the values that do not match the testing pattern.",
    },
  ],
};
