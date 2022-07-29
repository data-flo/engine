module.exports = {
  "description": "Replaces all instances of a pattern in a text with a specified replacement text.",
  "group": "Transformations",
  "subgroup": "Text Manipulation",
  "input": [
    {
      "name": "text",
      "type": "text",
      "description": "The text containing values to be replaced.",
    },
    {
      "name": "pattern",
      "type": "text",
      "description": "The text or regular expression to be replaced.\nThe pattern is treated as a regular expression if it begins and ends with `/` (e.g. `/.*/`).",
    },
    {
      "name": "replacement",
      "type": "text",
      "description": "The text that replaces all instances of the `pattern`.\nIf unspecified, matches will be replaced with a blank text.\nIf a regular expression was used as a pattern, capture groups can be included as `$1`, `$2`, etc.",
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
