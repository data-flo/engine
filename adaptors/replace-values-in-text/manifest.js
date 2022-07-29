module.exports = {
  "description": "Replaces all instances of a pattern in a text with a specified replacement text.",
  "group": "Transformations",
  "subgroup": "Text Manipulation",
  "input": [
    {
      "name": "text",
      "type": "text",
      "description": "The text containing values to be replaced.",
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
      "description": "The text that replaces all instances of the `pattern`.\nIf unspecified, matches will be replaced with a blank text.\nIf a regular expression is used as a pattern, capture groups can be included as `$` followed by the number of the group (e.g. `$1` for the value of the first group).",
      "required": false,
      "default": "",
    },
  ],
  "output": [
    {
      "name": "text",
      "type": "text",
      "description": "A modified text.",
    },
  ],
};
