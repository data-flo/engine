module.exports = {
  "description": "Renames an existing column in a datatable.",
  "group": "Transformations",
  "subgroup": "Data Tables",
  "input": [
    {
      "name": "data",
      "type": "datatable",
      "description": "A datatable which contains columns to be renamed."

    },
    {
      "name": "mapping",
      "type": "map",
      "description": "A mapping of old column names to new ones."
    },
    {
      "name": "discard",
      "type": "boolean",
      "description": "Specifies whether to discard columns which are not included in `mapping`. Defaults to `true`.",
      "default": true
    }
  ],
  "output": [
    {
      "name": "data",
      "type": "datatable",
      "description": "A datatable with the columns renamed."
    }
  ]
}