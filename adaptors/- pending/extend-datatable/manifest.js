module.exports = {
  "description": "Adds a new column to a datatable and optionally sets new values based on another existing column.",
  "group": "Transformations",
  "subgroup": "Data Tables",
  "input": [
    {
      "name": "data",
      "type": "datatable",
      "description": "The columns and rows."
    },
    {
      "name": "source",
      "type": "text",
      "description": "The name of an existing column."
    },
    {
      "name": "target",
      "type": "text",
      "description": "The name of the new column to create."
    },
    {
      "name": "values",
      "type": "map",
      "description": "A mapping such that for a given value in the source column, a corresponding value should appear in the target column"
    }
  ],
  "output": [
    {
      "name": "data",
      "type": "datatable",
      "description": "The new columns and rows."
    }
  ]
}