export default {
  "description": "Adds a text value to the end of a list.",
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
      "description": "A new list with the value appended.",
    },
  ],
};
