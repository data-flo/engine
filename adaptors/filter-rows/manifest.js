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
    },
    {
      "name": "pattern",
      "type": "text",
      "description": "A string or a regular expression to be searched for within the list. Regular expressions must be wrapped with / character (e.g. /.*/)."
    }
  ],
  "output": [
    {
      "name": "data",
      "type": "datatable",
      "description": "A new datatable with the rows that match the testing expression; otherwise, an empty datatable is returned."
    },
    {
      "name": "complementary",
      "type": "datatable",
      "description": "A new datatable with the rows that do not match the testing expression."
    }
  ]
}