module.exports = {
  "description": "Compares values in specified columns.",
  "group": "Transformations",
  "subgroup": "Data Tables",
  "input": [
    {
      "name": "data",
      "type": "datatable",
      "description": "The datatable containing columns to compare.",
    },
    {
      "name": "columns",
      "type": "list",
      "description": "A list of columns to be compared.",
    },
    {
      "name": "case sensitive",
      "type": "boolean",
      "description": "Whether lowercase and uppercase letters should be treated as equivalent.\nDefaults to `False` (lowercase and uppercase letters are treated as equivalent).",
      "default": false,
    },
  ],
  "output": [
    {
      "name": "same",
      "type": "datatable",
      "description": "A datatable containing rows which have the same values in selected columns.",
    },
    {
      "name": "different",
      "type": "datatable",
      "description": "A datatable containing rows which have different values in selected columns.",
    },
  ],
};
