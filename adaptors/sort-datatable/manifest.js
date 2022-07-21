const { SortDirections } = require("../../enums");

module.exports = {
  "description": "Sorts a datatable by one or more columns.",
  "group": "Transformations",
  "subgroup": "Data Tables",
  "input": [
    {
      "name": "data",
      "type": "datatable",
      "description": "The datatable to be sorted.",
      "required": true,
    },
    {
      "name": "column names",
      "type": "map",
      "description": "A map of column names with sort direction, where the key(s) are the column name(s), and the value(s) should be either `asc` (for ascending order) or `desc` (for descending order).",
      "required": true,
      "ui": {
        "keys": { "column-in": "data" },
        "values": { "must-be-one-of": SortDirections },
      },
    },
  ],
  "output": [
    {
      "name": "data",
      "type": "datatable",
      "description": "A datatable with the sorted rows.",
    },
  ],
};
