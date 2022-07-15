module.exports = {
  "description": "Appends the rows of two datatables into a new datatable based on common column names.",
  "group": "Transformations",
  "subgroup": "Data Tables",
  "input": [
    {
      "name": "first data",
      "type": "datatable",
      "description": "The first datatable.",
    },
    {
      "name": "second data",
      "type": "datatable",
      "description": "The second datatable.",
    },
    {
      "name": "case sensitive",
      "type": "boolean",
      "description": "When set to `True`, lowercase and uppercase letters are treated as different. When set to `False`, lowercase and uppercase letters are treated as equivalent, and `first data` column names will be used in the output datatable.\nIf unspecified, defaults to `True`",
      "required": false,
      "default": true,
    },
    {
      "name": "exclude unmatched columns",
      "type": "boolean",
      "description": "Specifies whether to exclude columns which do not exist in both datatables.\nIf unspecified, defaults to `False` (all columns from both datatable will be included).",
      "default": false,
    },
  ],
  "output": [
    {
      "name": "data",
      "type": "datatable",
      "description": "A datatable containing rows from both datatables.",
    },
  ],
};
