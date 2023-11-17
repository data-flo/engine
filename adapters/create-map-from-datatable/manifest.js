module.exports = {
  "description": "Creates a map from a datatable.",
  "group": "Transform",
  "subgroup": "Dictionary Manipulation",
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
      "ui": { "column-in": "data" },
    },
    {
      "name": "value column",
      "type": "text",
      "description": "The name of the column which contains values.\nIf unspecified, defaults to `value`.",
      "required": true,
      "default": "value",
      "ui": { "column-in": "data" },
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
