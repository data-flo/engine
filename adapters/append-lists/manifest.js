module.exports = {
  "description": "Appends two lists into one.",
  "group": "Transform",
  "subgroup": "List Manipulation",
  "input": [
    {
      "name": "first list",
      "type": "list",
      "description": "The list to which the second will be appended.",
      "required": true,
    },
    {
      "name": "second list",
      "type": "list",
      "description": "The list that will be appended to the first list.",
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
