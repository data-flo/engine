const { JoinTypes, TextMatchingMode } = require("../../enums.js");

module.exports = {
  "description": "Joins two datatables based on a common column between them.",
  "group": "Transform",
  "subgroup": "Data Tables",
  "input": [
    {
      "name": "main data",
      "type": "datatable",
      "description": "The main (left) datatable. When `inner join` is `False`, all rows from this datatable will be included.",
      "required": true,
    },
    {
      "name": "main column",
      "type": "text",
      "description": "The column in `main data` containing values shared by `other column` in `other data`.",
      "required": true,
    },

    {
      "name": "other data",
      "type": "datatable",
      "description": "The other (right) datatable, to be joined to main datatable.",
      "required": true,
    },
    {
      "name": "other column",
      "type": "text",
      "description": "The column in `other data` containing values shared by `main column` in `main data`.\nIf more than one row match main column value, only the first matching row will be joined.\nIf unspecified, the name of `main column` will be used.",
      "required": false,
    },

    {
      "name": "join type",
      "type": "text",
      "description": "Specifies the joining method\n See https://www.datasciencemadesimple.com/join-in-r-merge-in-r/.\nIf unspecified, defaults to `Left Join`.",
      "required": false,
      "default": "Left Join",
      "ui": { "must-be-one-of": JoinTypes },
    },
    {
      "name": "case sensitive",
      "type": "boolean",
      "description": "When set to `True`, lowercase and uppercase letters are treated as equivalent when matching values, e.g. `Peru` = `peru`.\nIf unspecified, defaults to `True`.",
      "required": false,
      "default": true,
    },
    {
      "name": "match diacritics",
      "type": "boolean",
      "description": "When set to `True`, letters with and without diacritics are treated as equivalent when matching values, e.g. `Perú` = `Peru`.\nIf unspecified, defaults to `True`.",
      "required": false,
      "default": true,
    },
    {
      "name": "columns",
      "type": "list",
      "description": "Specifies which columns of `other data` to include in the output datatable.\nIf unassigned, all columns in `other data` will be included.",
      "required": false,
    },
    {
      "name": "prefix",
      "type": "text",
      "description": "An optional text to be prepended to `other data` column names in the output datatable.\nIf unspecified, column names remain unchanged.",
      "required": false,
    },
  ],
  "output": [
    {
      "name": "data",
      "type": "datatable",
      "description": "A datatable containing joined rows and columns.",
    },
    {
      "name": "unmatched",
      "type": "datatable",
      "description": "A datatable containing `main data` rows which do not have a match in `other data`.",
    },
  ],
};
