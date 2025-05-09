const { FilterTypes } = require("../../enums");

module.exports = {
  "description": "Filters rows in a datatable based on a search criteria or regular expression.",
  "group": "Transform",
  "subgroup": "Data Tables",
  "input": [
    {
      "name": "data",
      "type": "datatable",
      "description": "The datatable to be searched.",
      "required": true,
    },
    {
      "name": "column name",
      "type": "text",
      "description": "The name of column in the datatable to be searched.",
      "required": true,
      "ui": { "column-in": "data" },
    },
    {
      "name": "filter type",
      "type": "text",
      "description": "The type of filter applied.",
      "required": false,
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
      "name": "case sensitive",
      "type": "boolean",
      "description": "When set to `True`, lowercase and uppercase letters are treated as different when comparing text values. When set to `False`, lowercase and uppercase letters are treated as equivalent. If unspecified, defaults to `False`",
      "required": false,
      "default": false,
    },
  ],
  "output": [
    {
      "name": "data",
      "type": "datatable",
      "description": "A datatable with the rows that match the testing pattern.",
    },
    {
      "name": "complementary",
      "type": "datatable",
      "description": "A datatable with the rows that do not match the testing pattern.",
    },
  ],
};
