module.exports = {
  "description": "Converts a list to a datatable.",
  "group": "Transformations",
  "subgroup": "List Manipulation",
  "input": [
    {
      "name": "list",
      "type": "list",
      "description": "A list to be converted to a datatable."
    },
    {
      "name": "column",
      "type": "text",
      "default": "value",
      "description": "The name of the column in which the list elements will be added. Defaults to 'value'."
    }
  ],
  "output": [
    {
      "name": "data",
      "type": "datatable",
      "description": "A datatable containing the list elements."
    }
  ]
}