module.exports = {
  "description": "Finds values in a list that match a pattern.",
  "group": "Transformations",
  "subgroup": "List Manipulation",
  "input": [
    {
      "name": "list",
      "type": "list",
      "description": "The list to be filtered.",
      "required": true,
    },
    {
      "name": "pattern",
      "type": "text",
      "description": "A text or a regular expression to be searched for within the list.\nRegular expressions must be wrapped with / character (e.g. /.*/).",
      "required": true,
    },
  ],
  "output": [
    {
      "name": "values",
      "type": "list",
      "description": "A list with the values that match the testing pattern.",
    },
    {
      "name": "complementary",
      "type": "list",
      "description": "A list with the values that do not match the testing pattern.",
    },
  ],
};
