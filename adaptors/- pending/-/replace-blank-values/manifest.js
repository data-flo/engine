module.exports = {
  "description": "Replaces blank values in a datatable column.",
  "group": "Transformations",
  "subgroup": "Data Tables",
  "input": [
    {
      "name": "data",
      "type": "datatable",
      "description": "A datatable to be searched."
    },
    {
      "name": "column",
      "type": "text",
      "description": "The name of column in the datatable to be searched."
    },
    {
      "name": "replacement",
      "type": "text",
      "description": "A value to replace blanks."
    }
  ],
  "output": [
    {
      "name": "data",
      "type": "datatable",
      "description": "A datatable with the blank values replaced."
    }
  ]
}