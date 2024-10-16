module.exports = {
  "description": "Returns unique values in a list.",
  "group": "Transform",
  "subgroup": "List Manipulation",
  "input": [
    {
      "name": "list",
      "type": "list",
      "description": "The input list.",
      "required": true,
    },
  ],
  "output": [
    {
      "name": "list",
      "type": "list",
      "description": "A list containing the unique in the input list.",
    },
  ],
};
