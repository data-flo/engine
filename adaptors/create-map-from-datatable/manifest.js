export default {
  "description": "Creates a map from a datatable.",
  "group": "Transformations",
  "subgroup": "Map Manipulation",
  "input": [
    {
      "name": "data",
      "type": "datatable",
      "description": "The datatable containing key-value pairs.",
      "required": true,
    },
    {
      "name": "key column",
      "type": "text",
      "description": "The name of the column which contains keys.\nIf unspecified, defaults to `key`.",
      "required": true,
      "default": "key",
    },
    {
      "name": "value column",
      "type": "text",
      "description": "The name of the column which contains values.\nIf unspecified, defaults to `value`.",
      "required": true,
      "default": "value",
    },
  ],
  "output": [
    {
      "name": "map",
      "type": "map",
      "description": "A map containing key-value pairs.",
    },
  ],
};
