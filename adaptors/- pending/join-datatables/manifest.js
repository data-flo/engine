module.exports = {
  "description": "Joins two datatables based on a common column between them.",
  "group": "Transformations",
  "subgroup": "Data Tables",
  "input": [
    {
      "name": "main data",
      "type": "datatable",
      "description": "The main (left) datatable. When `inner join` is `False`, all rows from this datatable will be included.",
    },
    {
      "name": "main column",
      "type": "text",
      "description": "The column in `main data` containing values shared by `other column` in `other data`.",
    },
    {
      "name": "other data",
      "type": "datatable",
      "description": "The other (right) datatable, to be joined to main datatable.",
    },
    {
      "name": "other column",
      "type": "text",
      "description": "The column in `other data` containing values shared by `main column` in `main data`.\nIf more than one row match main column value, only the first matching row will be joined.\nIf unspecified, the name of `main column` will be used.",
      "default": null,
    },

    {
      "name": "inner join",
      "type": "boolean",
      "description": "Specifies whether to only include the rows from `main data` that are also in `other data`.\nWhen set to `True`, rows from `main data` that do not have matches in `other data` will be excluded.\nIf unspecified, defaults to `False`.",
      "default": false,
    },
    {
      "name": "case sensitive",
      "type": "boolean",
      "description": "When set `False`, lowercase and uppercase letters are treated as equivalent.\nIf unspecified, defaults to `False`.",
      "default": false,
    },
    {
      "name": "columns",
      "type": "list",
      "description": "Specifies which columns of `other data` to include.\nIf unassigned, all columns in `other data` will be included.",
      "default": null,
    },
  ],
  "output": [
    {
      "name": "data",
      "type": "datatable",
      "description": "A datatable containing joined rows and columns.",
    },
    {
      "name": "skipped",
      "type": "datatable",
      "description": "A datatable containing rows which have not been joined.",
    },
  ],
};
