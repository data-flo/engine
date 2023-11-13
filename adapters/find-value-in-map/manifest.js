module.exports = {
  "description": "Finds a key in a map and returns the associated value.",
  "group": "Transform",
  "subgroup": "Map Manipulation",
  "input": [
    {
      "name": "map",
      "type": "map",
      "description": "The map to lookup the key-value pair.",
      "required": true,
    },
    {
      "name": "key",
      "type": "text",
      "description": "The key to be found.",
      "required": true,
    },
    {
      "name": "case sensitive",
      "type": "boolean",
      "description": "When set to `False`, lowercase and uppercase letters are treated as equivalent when matching values, e.g. `Peru` = `peru`.\nIf unspecified, defaults to `False`.",
      "required": false,
      "default": false,
    },
    {
      "name": "match diacritics",
      "type": "boolean",
      "description": "When set to `False`, letters with and without diacritics are treated as equivalent when matching values, e.g. `Perú` = `Peru`.\nIf unspecified, defaults to `False`.",
      "required": false,
      "default": false,
    },
    {
      "name": "default value",
      "type": "text",
      "description": "A value to be returned if `key` is not found in `map`.\nIf unspecified, no value will be returned.",
      "required": false,
      "default": "",
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
