module.exports = {
  "description": "Creates a list from values of a datatable column.",
  "group": "Transformations",
  "subgroup": "List Manipulation",
  "input": [
    {
      "name": "data",
      "type": "datatable",
      "description": "A datatable containing the values column."
    },
    {
      "name": "column",
      "type": "text",
      "description": "The name of the column from which the list elements will be created."
    }
  ],
  "output": [
    {
      "name": "list",
      "type": "list",
      "description": "A list containing the values of the datatable column."
    }
  ]
}