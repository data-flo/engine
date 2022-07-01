module.exports = {
  "description": "Discards a list of columns from datatable.",
  "group": "Transformations",
  "subgroup": "Data Tables",
  "input": [
    {
      "name": "data",
      "type": "datatable",
      "description": "A datatable containing columns to be discarded."

    },
    {
      "name": "columns",
      "type": "list",
      "description": "A list of columns to be excluded."
    }
  ],
  "output": [
    {
      "name": "data",
      "type": "datatable",
      "description": "A new datatable with the discarded columns."
    }
  ]
}