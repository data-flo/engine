const { SortDirections } = require("../../enums");

module.exports = {
  "description": "Sorts values in a list.",
  "group": "Transformations",
  "subgroup": "List Manipulation",
  "input": [
    {
      "name": "list",
      "type": "list",
      "description": "The list to be sorted.",
    },
    {
      "name": "sort direction",
      "type": "text",
      "description": "Specifies the sort direction, should be either `asc` (for ascending order) or `desc` (for descending order).",
      "required": true,
      "ui": { "must-be-one-of": SortDirections },
    },
  ],
  "output": [
    {
      "name": "list",
      "type": "list",
      "description": "A list containing the sorted values.",
    },
  ],
};
