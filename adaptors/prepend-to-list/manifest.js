module.exports = {
  "description": "Adds one element to the beginning of a list.",
  "group": "Transformations",
  "subgroup": "List Manipulation",
  "input": [
    {
      "name": "list",
      "type": "list",
      "description": "A list to which the value will be prepended."
    },
    {
      "name": "value",
      "type": "text",
      "description": "A value to append to the list."
    }
  ],
  "output": [
    {
      "name": "list",
      "type": "list",
      "description": "A new list with the value prepended."
    }
  ]
}