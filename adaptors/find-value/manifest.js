module.exports = {
  "description": "Finds a value in a list that match a search string or regular expression.",
  "group": "Transformations",
  "subgroup": "List Manipulation",
  "input": [
    {
      "name": "list",
      "type": "list",
      "description": "A list to be searched."
    },
    {
      "name": "pattern",
      "type": "text",
      "description": "A string or a regular expression to be searched for within the list. Regular expressions must be wrapped with / character (e.g. /.*/)."
    }
  ],
  "output": [
    {
      "name": "value",
      "type": "text",
      "description": "The value of the first element in the list that match the testing expression; otherwise, null is returned."
    },
    {
      "name": "index",
      "type": "integer",
      "description": "The one-based index of first element in the list that match the testing expression; otherwise, null is returned."
    }
  ]
}