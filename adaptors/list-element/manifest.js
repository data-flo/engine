module.exports = {
  "description": "Returns an element of list at a specified index.",
  "group": "Transformations",
  "subgroup": "List Manipulation",
  "input": [
    {
      "name": "list",
      "type": "list",
      "description": "A list to be searched."
    },
    {
      "name": "index",
      "type": "text",
      "default": 1,
      "description": "The one-based index of the element to be returned. Defaults to 1."
    }
  ],
  "output": [
    {
      "name": "value",
      "type": "text",
      "description": "The value of the element in the list at the specified index if the list is not empty; otherwise, null is returned."
    }
  ]
}