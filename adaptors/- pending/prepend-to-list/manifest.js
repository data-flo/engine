module.exports = {
  "description": "Adds a text value to the  beginning of a list.",
  "group": "Transformations",
  "subgroup": "List Manipulation",
  "input": [
    {
      "name": "list",
      "type": "list",
      "description": "The list to which the values will be prepended.",
    },
    {
      "name": "value",
      "type": "text",
      "description": "The value to be prepended to the list.",
    },
  ],
  "output": [
    {
      "name": "list",
      "type": "list",
      "description": "A new list with the value prepended.",
    },
  ],
};
