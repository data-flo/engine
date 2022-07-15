module.exports = {
  "description": "Finds a key in a map and returns the associated value.",
  "group": "Transformations",
  "subgroup": "Map Manipulation",
  "input": [
    {
      "name": "map",
      "type": "map",
      "description": "The map to lookup the key-value pair.",
    },
    {
      "name": "key",
      "type": "text",
      "description": "The key to be found.",
    },
    {
      "name": "default value",
      "type": "text",
      "description": "A value to be returned if `key` is not found in `map`.\nIf unspecified, no value will be returned.",
    },
  ],
  "output": [
    {
      "name": "value",
      "type": "text",
      "description": "The value in `map` associated to `key` if found, otherwise `default value` will be returned.",
    },
  ],
};
