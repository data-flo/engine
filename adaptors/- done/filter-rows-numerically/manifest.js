module.exports = {
  "description": "Finds rows in a datatable that match a numeric comparison using teh `>`, `>=`, `<` or `<=` operators.",
  "group": "Transformations",
  "subgroup": "Data Tables",
  "input": [
    {
      "name": "data",
      "type": "datatable",
      "description": "A datatable to be filtered.",

    },
    {
      "name": "column",
      "type": "text",
      "description": "The name of column in the datatable to be filtered.",
    },
    {
      "name": "operator",
      "type": "text",
      "description": "One of `<`, `<=`, `>`, or  `>=`.",
    },
    {
      "name": "check",
      "type": "text",
      "description": "A number to be used for the comparison operation.",
    },
    {
      "name": "include non-numeric",
      "type": "boolean",
      "description": "Specifies whether to include or exclude non-numeric and blank values.\nIf unspecified, defaults to False (i.e. non-numeric and blank values will be added to complementary output).",
      "default": false,
    },
  ],
  "output": [
    {
      "name": "data",
      "type": "datatable",
      "description": "A datatable with the rows that match the numerical comparison, and non-numeric values when `include non-numeric` is set to `True`.",
    },
    {
      "name": "complementary",
      "type": "datatable",
      "description": "A datatable with the rows that do not match the numerical comparison, and non-numeric values when `include non-numeric` is set to `False`.",
    },
  ],
};
