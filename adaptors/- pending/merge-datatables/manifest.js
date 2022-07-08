module.exports = {
  "description": "Merges rows of two datatables into A datatable.",
  "group": "Transformations",
  "subgroup": "Data Tables",
  "input": [
    {
      "name": "first data",
      "type": "datatable",
      "description": "The first datatable."
    },
    {
      "name": "second data",
      "type": "datatable",
      "description": "The second datatable."
    },
    {
      "name": "columns",
      "type": "map",
      "description": "Specifies which columns to be included.\nIf unassigned, all columns in both datatables will be included.",
      "default": null
    },
    {
      "name": "intersect columns",
      "type": "boolean",
      "description": "Specifies whether to only include columns which exist in both datatables.\nIf unassigned, it defaults to `False`.",
      "default": false
    }
  ],
  "output": [
    {
      "name": "data",
      "type": "datatable",
      "description": "A datatable containing joined rows and columns."
    }
  ]
}
