module.exports = {
  "description": "Finds rows in a datatable that match a search string or regular expression.",
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
    }
  ],
  "output": [
    {
      "name": "blanks",
      "type": "datatable",
      "description": "A new datatable with the rows that match the testing expression; otherwise, an empty datatable is returned."
    },
    {
      "name": "non-blanks",
      "type": "datatable",
      "description": "A new datatable with the rows that *did not match* the testing expression."
    }
  ]
}