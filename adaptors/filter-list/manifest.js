module.exports = {
  "description": "Finds values in a list that match a search string or regular expression.",
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
      "name": "values",
      "type": "list",
      "description": "A new list with the elements that match the testing expression; otherwise, an empty list is returned."
    },
    {
      "name": "complementary",
      "type": "list",
      "description": "A new list with the elements that do not match the testing expression."
    }
  ]
}