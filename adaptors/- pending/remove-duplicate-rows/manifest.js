module.exports = {
  "description": "Finds rows in a datatable that are duplicated and removes the duplicates into a duplicates datatable.",
  "group": "Transformations",
  "subgroup": "Data Tables",
  "input": [
    {
      "name": "data",
      "type": "datatable",
      "description": "A datatable to be searched for duplicates."

    }
  ],
  "output": [
    {
      "name": "data",
      "type": "datatable",
      "description": "A datatable with only unique rows."
    },
    {
      "name": "duplicates",
      "type": "datatable",
      "description": "A datatable with the duplicate rows."
    }
  ]
}