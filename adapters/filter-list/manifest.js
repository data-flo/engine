module.exports = {
  "description": "Finds values in a list that match a pattern.",
  "group": "Transform",
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
    {
      "name": "match case",
      "type": "boolean",
      "description": "When set to `True`, lowercase and uppercase letters are treated as equivalent when matching values, e.g. `Peru` = `peru`.\nIf unspecified, defaults to `True`.",
      "required": false,
      "default": true,
    },
    {
      "name": "match diacritics",
      "type": "boolean",
      "description": "When set to `True`, letters with and without diacritics are treated as equivalent when matching values, e.g. `Perú` = `Peru`.\nIf unspecified, defaults to `True`.",
      "required": false,
      "default": true,
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
