module.exports = {
  "description": "Selects a list of columns from a datatable in a specified order.",
  "group": "Transformations",
  "subgroup": "Data Tables",
  "input": [
    {
      "name": "data",
      "type": "datatable",
      "description": "The datatable containing columns to be selected.",
      "required": true,
    },
    {
      "name": "column names",
      "type": "list",
      "description": "The list of columns to be included in the specified order.",
      "required": false,
      "ui": { "column-in": "data" },
    },
    {
      "name": "pattern",
      "type": "text",
      "description": "Specifies the pattern (a text or a regular expression) to select columns whose name matches that pattern.\nMatching columns will be added after any columns specified in `column names`, and in the order in which they appear in the original datatable.\nThe pattern is treated as a regular expression if it begins and ends with `/` (e.g. /.*/).",
      "required": false,
    },
  ],
  "output": [
    {
      "name": "data",
      "type": "datatable",
      "description": "A datatable with the selected columns.",
    },
  ],
};
