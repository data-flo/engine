module.exports = {
  "description": "Replaces values in one or more columns in a datatable based on a pattern. The replacement values can be written to the original columns or new columns.",
  "group": "Transformations",
  "subgroup": "Data Tables",
  "input": [
    {
      "name": "data",
      "type": "datatable",
      "description": "The datatable containing values to be replaced.",
    },

    {
      "name": "column names",
      "type": "map",
      "description": "A map of original column names with names of new columns, where the map keys are the names of existing columns, and the map values are the names of the columns to which the replacement values are written. If a map value is left blank, the replacement values are written to the original column.",
    },

    {
      "name": "pattern",
      "type": "text",
      "description": "A text or a regular expression to be replaced. The pattern is treated as a regular expression if it begins and ends with `/` (e.g. `/.*/`).",
    },
    {
      "name": "replacement",
      "type": "text",
      "description": "A text that replaces the substring specified by the `pattern` argument. should include $1 $2... for matching groups",
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
