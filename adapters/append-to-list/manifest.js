module.exports = {
  "description": "Adds a text value to the end of a list.",
  "group": "Transform",
  "subgroup": "List Manipulation",
  "input": [
    {
      "name": "list",
      "type": "list",
      "description": "The list to which the values will be appended.\nIf not specified, the value will be added to a new list.",
      "required": false,
      "default": [],
    },
    {
      "name": "value",
      "type": "text",
      "description": "The value to be appended to the list.",
      "required": true,
    },
  ],
  "output": [
    {
      "name": "list",
      "type": "list",
      "description": "A list with the value appended.",
    },
  ],
};
