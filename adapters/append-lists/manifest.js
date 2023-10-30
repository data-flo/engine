module.exports = {
  "description": "Appends two lists into one.",
  "group": "Transform",
  "subgroup": "List Manipulation",
  "input": [
    {
      "name": "first list",
      "type": "list",
      "description": "The first list to be merged.",
      "required": true,
    },
    {
      "name": "second list",
      "type": "list",
      "description": "The second list to be merged.",
      "required": true,
    },
  ],
  "output": [
    {
      "name": "list",
      "type": "list",
      "description": "A list containing values from both lists.",
    },
  ],
};
