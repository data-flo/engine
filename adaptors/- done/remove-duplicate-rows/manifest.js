module.exports = {
  "description": "Removes duplicate rows from a datatable.",
  "group": "Transformations",
  "subgroup": "Data Tables",
  "input": [
    {
      "name": "data",
      "type": "datatable",
      "description": "The datatable containing duplicate rows.",
    },
    {
      "name": "columns",
      "type": "list",
      "description": "A list of columns to compare for duplicate values.\nIf unspecified, entire rows will be compared.",
    },
    {
      "name": "case sensitive",
      "type": "boolean",
      "description": "When set to `True`, lowercase and uppercase letters are treated as different. When set to `False`, lowercase and uppercase letters are treated as equivalent.\nIf unspecified, defaults to `False`",
      "required": false,
      "default": false,
    },
  ],
  "output": [
    {
      "name": "data",
      "type": "datatable",
      "description": "A datatable containing only unique rows, including first instance of duplicate rows.",
    },
    {
      "name": "duplicates",
      "type": "datatable",
      "description": "A datatable containing duplicate rows.",
    },
  ],
};
