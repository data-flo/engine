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
      "required": true,
      "ui": { "column-in": "data" },
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
