module.exports = {
  "description": "Adds a value to a map.",
  "group": "Transformations",
  "subgroup": "Map Manipulation",
  "input": [
    {
      "name": "map",
      "type": "map",
      "description": "The map to which the value will be added.\nIf unspecified, the value will be added to a new map.",
      "required": false,
      "default": {},
    },
    {
      "name": "key",
      "type": "text",
      "description": "The key to be added to the map.",
      "required": true,
    },
    {
      "name": "value",
      "type": "text",
      "description": "The value to be added to the map.",
      "required": true,
    },
    {
      "name": "overwrite",
      "type": "boolean",
      "description": "Whether to overwrite the value if the specified key already exists in the map.\nIf unspecified, defaults to `True`.",
      "required": false,
      "default": true,
    },
  ],
  "output": [
    {
      "name": "map",
      "type": "map",
      "description": "A map containing the added value.",
    },
  ],
};
