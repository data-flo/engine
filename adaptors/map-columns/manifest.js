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
      "name": "mappings",
      "type": "datatable",
      "description": "A datatable which contains the following columns: `old column`, `old value`, `new column`, and `new value`."
    },
    {
      "name": "discard",
      "type": "boolean",
      "description": "Specifies whether to discard columns which are not included in `mappings`. Defaults to `true`.",
      "default": true
    }
  ],
  "output": [
    {
      "name": "data",
      "type": "datatable",
      "description": "A new datatable with the columns mapped."
    }
  ]
}