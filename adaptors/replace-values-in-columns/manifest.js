module.exports = {
  "description": "Replaces all instances of a pattern in one or more columns in a datatable. The replacement values can be written to the original columns or new columns.",
  "group": "Transformations",
  "subgroup": "Data Tables",
  "input": [
    {
      "name": "data",
      "type": "datatable",
      "description": "The datatable containing values to be replaced.",
      "required": true,
    },

    {
      "name": "columns",
      "type": "map",
      "description": "A map of existing column names with names of new columns, where the map keys are the names of existing columns, and the map values are the names of the columns to which the replacement values are written.\nIf a map value is left blank, the replacement values are written to the original column.",
      "required": true,
    },

    {
      "name": "pattern",
      "type": "text",
      "description": "The text or regular expression to be replaced.\nThe pattern is treated as a regular expression if it begins and ends with `/` (e.g. `/.*/`).",
      "required": true,
    },
    {
      "name": "replacement",
      "type": "text",
      "description": "The text that replaces all instances of the `pattern`.\nIf unspecified, matches will be replaced with a blank text.\nIf a regular expression was used as a pattern, capture groups can be included as `$1`, `$2`, etc.",
      "required": false,
      "default": "",
    },

  ],
  "output": [
    {
      "name": "data",
      "type": "datatable",
      "description": "A datatable with replacement values written to the original columns or new columns.",
    },
  ],
};
