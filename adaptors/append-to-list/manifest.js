module.exports = {
  "description": "Adds one element to the end of a list.",
  "group": "Transformations",
  "subgroup": "List Manipulation",
  "input": [
    {
      "name": "list",
      "type": "list",
      "description": "A list to which the value will be appended.",
      "required": true,
    },
    {
      "name": "value",
      "type": "text",
      "description": "A value to append to the list.",
      "required": true,
    },
  ],
  "output": [
    {
      "name": "list",
      "type": "list",
      "description": "A new list with the value appended.",
    },
  ],
};
