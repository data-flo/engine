module.exports = {
  "description": "Splits a list into two lists at the first instance of a specified separator value.",
  "group": "Transform",
  "subgroup": "List Manipulation",
  "input": [
    {
      "name": "list",
      "type": "list",
      "description": "The list to be split.",
      "required": true,
    },
    {
      "name": "separator",
      "type": "text",
      "description": "The value at which the list is split.",
      "required": true,
    },
    {
      "name": "append",
      "type": "boolean",
      "required": false,
      "default": false,
      "description": "Whether to append the separator value to the first list.\nIf unspecified, defaults to `False`.",
    },
    {
      "name": "prepend",
      "type": "boolean",
      "required": false,
      "default": false,
      "description": "Whether to prepend the separator value to the second list.\nIf unspecified, defaults to `False`.",
    },
  ],
  "output": [
    {
      "name": "first",
      "type": "list",
      "description": "A list containing the values before the separator value.",
    },
    {
      "name": "second",
      "type": "list",
      "description": "A list containing the values after the separator value.",
    },
  ],
};
