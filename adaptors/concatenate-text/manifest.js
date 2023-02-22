export default {
  "description": "Concatenates two texts.",
  "group": "Transformations",
  "subgroup": "Text Manipulation",
  "input": [
    {
      "name": "text one",
      "type": "text",
      "description": "First text to be concatenated.",
      "required": true,
    },
    {
      "name": "text two",
      "type": "text",
      "description": "Second text to be concatenated.",
      "required": true,
    },
    {
      "name": "separator",
      "type": "text",
      "description": "Specifies text to separate the concatenated texts.\nIf unspecified, defaults to blank.",
      "required": false,
      "default": "",
    },
  ],
  "output": [
    {
      "name": "combination",
      "type": "text",
      "description": "The concatenated text.",
    },
  ],
};
