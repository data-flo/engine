module.exports = {
  "description": "Returns unique list items",
  "group": "Transformations",
  "subgroup": "List Manipulation",
  "input": [
    {
      "name": "list",
      "type": "list",
      "description": "A list to be reduced to a set (list of unique items)."
    }
  ],
  "output": [
    {
      "name": "set",
      "type": "list",
      "description": "A list of unique items (a set)"
    }
  ]
}