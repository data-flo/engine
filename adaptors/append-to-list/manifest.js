module.exports = {
  "description": "Adds one or more text values to the end of a list.",
  "group": "Transformations",
  "subgroup": "List Manipulation",
  "input": [
    {
      "name": "list",
      "type": "list",
      "description": "The list to which the values will be appended.",
      "required": true,
    },
    {
      "name": "values",
      "type": "list",
      "description": "The values to be appended to the list.",
      "required": true,
    },
  ],
  "output": [
    {
      "name": "list",
      "type": "list",
      "description": "A new list with the values appended.",
    },
  ],
};
