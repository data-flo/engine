module.exports = {
  "description": "Finds rows in a datatable that match a numeric comparison using teh `>`, `>=`, `<` or `<=` operators.",
  "group": "Transformations",
  "subgroup": "Data Tables",
  "input": [
    {
      "name": "data",
      "type": "datatable",
      "description": "A datatable to be filtered."

    },
    {
      "name": "column",
      "type": "text",
      "description": "The name of column in the datatable to be filtered."
    },
    {
      "name": "operator",
      "type": "text",
      "description": "One of `<`, `<=`, `>`, or  `>=`."
    },
    {
      "name": "check",
      "type": "text",
      "description": "A number to be used for the comparison operation."
    }
  ],
  "output": [
    {
      "name": "data",
      "type": "datatable",
      "description": "A new datatable with the rows that match the numerical comparison; otherwise, an empty datatable is returned."
    },
    {
      "name": "complementary",
      "type": "datatable",
      "description": "A new datatable with the rows that do not match the numerical comparison."
    }
  ]
}