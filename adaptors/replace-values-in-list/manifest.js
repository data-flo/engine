export default {
  "description": "Replaces all instances of a pattern in list values with a specified replacement text.",
  "group": "Transformations",
  "subgroup": "List Manipulation",
  "input": [
    {
      "name": "list",
      "type": "list",
      "description": "The list of text values.",
      "required": true,
    },
    {
      "name": "pattern",
      "type": "text",
      "description": "The text or regular expression to be replaced.\nThe pattern is treated as a regular expression if it begins and ends with `/` (e.g. `/.*/`).",
      "required": true,
    },
    {
      "name": "replacement",
      "type": "text",
      "description": "The text that replaces all instances of the `pattern`.\nIf unspecified, matches will be replaced with a blank text.\nIf a regular expression was used as a pattern, capture groups can be included as `$1`, `$2`, etc.",
      "required": false,
      "default": "",
    },
  ],
  "output": [
    {
      "name": "list",
      "type": "list",
      "description": "The list of modified elements",
    },
  ],
};
