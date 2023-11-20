module.exports = {
  "description": "Finds a value in a list that matches a search pattern.",
  "group": "Transform",
  "subgroup": "List Manipulation",
  "input": [
    {
      "name": "list",
      "type": "list",
      "description": "The list to be searched.",
      "required": true,
    },
    {
      "name": "pattern",
      "type": "text",
      "description": "A text or a regular expression to be searched for within the list.",
      "required": true,
    },
    {
      "name": "case sensitive",
      "type": "boolean",
      "description": "When set to `True`, lowercase and uppercase letters are treated as equivalent when matching values, e.g. `Peru` = `peru`.\nIf unspecified, defaults to `True`.",
      "required": false,
      "default": false,
    },
    {
      "name": "match diacritics",
      "type": "boolean",
      "description": "When set to `True`, letters with and without diacritics are treated as equivalent when matching values, e.g. `Perú` = `Peru`.\nIf unspecified, defaults to `True`.",
      "required": false,
      "default": false,
    },
  ],
  "output": [
    {
      "name": "value",
      "type": "text",
      "description": "The value of the first match in the list.",
    },
    {
      "name": "index",
      "type": "number",
      "description": "The one-based index of first match in the list.",
    },
  ],
};
