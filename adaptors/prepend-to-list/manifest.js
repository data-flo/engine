module.exports = {
  "description": "Adds a text value to the end of a list.",
  "group": "Transformations",
  "subgroup": "List Manipulation",
  "input": [
    {
      "name": "list",
      "type": "list",
      "description": "The list to which the value will be prepended.",
      "required": true,
    },
    {
      "name": "value",
      "type": "text",
      "description": "The value to be prepended to the list.",
      "required": true,
    },
  ],
  "output": [
    {
      "name": "list",
      "type": "list",
      "description": "A list with the value prepended.",
    },
  ],
};