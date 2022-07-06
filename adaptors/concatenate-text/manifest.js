module.exports = {
  "description": "Concatenates text to the left and/or the right of the input, then returns the combined text as an output.",
  "group": "Transformations",
  "subgroup": "Text Manipulation",
  "input": [
    {
      "name": "left",
      "type": "text",
      "description": "Text to be joined to the left of the input. Defaults to \"\"",
      "required": true,
    },
    {
      "name": "right",
      "type": "text",
      "description": "Text to be joined to the right of the input. Defaults to \"\"",
      "required": true,
    },
    {
      "name": "separator",
      "type": "text",
      "description": "Specifies text to separate each concatenated value. Defaults to `\"\"` (blank).",
      "required": false,
      "default": "",
    },
  ],
  "output": [
    {
      "name": "combination",
      "type": "text",
      "description": "The combined text.",
    },
  ],
};
