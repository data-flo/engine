module.exports = {
  "description": "Joins rows of two datatables that have the same value for a specified column.",
  "group": "Transformations",
  "subgroup": "Data Tables",
  "input": [
    {
      "name": "main data",
      "type": "datatable",
      "description": "The main datatable."
    },
    {
      "name": "main column",
      "type": "text",
      "description": "The name the column in the `main data` that is used to join rows of `other data`."
    },
    {
      "name": "other data",
      "type": "datatable",
      "description": "The other datatable to be joined."
    },

    {
      "name": "other column",
      "type": "text",
      "description": "The name the column in the `other data` on that is used to join rows of `main data`.\nIf unassigned, the value of `main column` will be used.",
      "default": null
    },
    {
      "name": "inner join",
      "type": "boolean",
      "description": "Specifies whether to include rows that have matching values in both tables.\nDefaults to `False`.",
      "default": false
    },
    {
      "name": "case sensitive",
      "type": "boolean",
      "description": "When set `False`, lowercase and uppercase letters are treated as equivalent.\nDefaults to `False`.",
      "default": false
    },
    {
      "name": "columns",
      "type": "list",
      "description": "Specifies which columns of `other data` to include.\nIf unassigned, all columns in `other data` will be included.",
      "default": null
    }
  ],
  "output": [
    {
      "name": "data",
      "type": "datatable",
      "description": "A datatable containing joined rows and columns."
    },
    {
      "name": "skipped",
      "type": "datatable",
      "description": "A datatable containing rows which have not been joined."
    }
  ]
}
