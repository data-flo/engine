module.exports = {
  "description": "Creates a map from a datatable.",
  "group": "Transformations",
  "subgroup": "Map Manipulation",
  "input": [
    {
      "name": "data",
      "type": "datatable",
      "description": "An object containing columns and rows."
    },
    {
      "name": "key column",
      "type": "text",
      "description": "The name of the column which contains keys.\n Defaults to `key`.",
      "default": "key"
    },
    {
      "name": "value column",
      "type": "text",
      "description": "The name of the column which contains values..\n Defaults to `value`.",
      "default": "value"
    }
  ],
  "output": [
    {
      "name": "map",
      "type": "map",
      "description": "A map containing keys and values."
    }
  ]
}