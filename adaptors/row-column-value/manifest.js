module.exports = {
  "description": "Returns the value of datatable column at a specified row.",
  "group": "Transformations",
  "subgroup": "Data Tables",
  "input": [
    {
      "name": "data",
      "type": "datatab;e",
      "description": "A datatable to be searched."
    },
    {
      "name": "row",
      "type": "integer",
      "default": 1,
      "description": "The one-based index of the row to be selected.\nDefaults to `1` (first row)."
    },
    {
      "name": "column",
      "type": "text",
      "default": null,
      "description": "The name of the column to be selected.\nDefaults to the first column."
    }
  ],
  "output": [
    {
      "name": "value",
      "type": "text",
      "description": "The value of the column at in the specified row if the datatable is not empty and the column is found; otherwise, `null` is returned."
    }
  ]
}