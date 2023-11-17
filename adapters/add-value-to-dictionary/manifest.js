module.exports = {
  "description": "Adds a value to a dictionary.",
  "group": "Transform",
  "subgroup": "Dictionary Manipulation",
  "input": [
    {
      "name": "dictionary",
      "type": "dictionary",
      "description": "The dictionary to which the value will be added.\nIf unspecified, the value will be added to a new dictionary.",
      "required": false,
      "default": {},
    },
    {
      "name": "key",
      "type": "text",
      "description": "The key to be added to the dictionary.",
      "required": true,
    },
    {
      "name": "value",
      "type": "text",
      "description": "The value to be added to the dictionary.",
      "required": true,
    },
    {
      "name": "overwrite",
      "type": "boolean",
      "description": "Whether to overwrite the value if the specified key already exists in the dictionary.\nIf unspecified, defaults to `True`.",
      "required": false,
      "default": true,
    },
  ],
  "output": [
    {
      "name": "dictionary",
      "type": "dictionary",
      "description": "A dictionary containing the added value.",
    },
  ],
};
