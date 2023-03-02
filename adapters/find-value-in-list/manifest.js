module.exports = {
  "description": "Finds a value in a list that matches a search pattern.",
  "group": "Transformations",
  "subgroup": "List Manipulation",
  "input": [
    {
      "name": "list",
      "type": "list",
      "description": "The list to be searched.",
      "required": true,
    },
    {
      "name": "pattern",
      "type": "text",
      "description": "A text or a regular expression to be searched for within the list.",
      "required": true,
    },
  ],
  "output": [
    {
      "name": "value",
      "type": "text",
      "description": "The value of the first match in the list.",
    },
    {
      "name": "index",
      "type": "number",
      "description": "The one-based index of first match in the list.",
    },
  ],
};
