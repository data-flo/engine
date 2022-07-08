module.exports = {
  "description": "Selects a list of columns from datatable.",
  "group": "Transformations",
  "subgroup": "Data Tables",
  "input": [
    {
      "name": "data",
      "type": "datatable",
      "description": "A datatable containing columns to be selected."

    },
    {
      "name": "columns",
      "type": "list",
      "description": "A list of columns to be included."
    }
  ],
  "output": [
    {
      "name": "data",
      "type": "datatable",
      "description": "A datatable with the selected columns."
    }
  ]
}