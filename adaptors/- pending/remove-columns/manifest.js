module.exports = {
  "description": "Removes specified columns from a datatable.",
  "group": "Transformations",
  "subgroup": "Data Tables",
  "input": [
    {
      "name": "data",
      "type": "datatable",
      "description": "A datatable to be searched."
    },
    {
      "name": "columns",
      "type": "list",
      "description": "A list of columns in `data` to be removed.",
      "default": null
    }
  ],
  "output": [
    {
      "name": "data",
      "type": "datatable",
      "description": "A datatable with the specified columns removed."
    }
  ]
}