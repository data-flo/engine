// TODO: rename to match text

module.exports = {
  "description": "Searches for a pattern in a text using a regular expression.",
  "group": "Transformations",
  "subgroup": "Text Manipulation",
  "input": [
    {
      "name": "text",
      "type": "text",
      "description": "A text value to be searched.",
      "required": true,
    },
    {
      "name": "pattern",
      "type": "text",
      "description": "A text or a regular expression to be replaced.\nRegular expressions must be wrapped with `/` character (e.g. `/.*/`).",
      "required": true,
    },
    {
      "name": "ignore case",
      "type": "boolean",
      "description": "Whether lowercase and uppercase letters should be treated as equivalent. Defaults to `True`.",
      "required": false,
      "default": true,
    },
  ],
  "output": [
    {
      "name": "match",
      "type": "boolean",
      "description": "Whether the given text matches the pattern.",
    },
  ],
};
