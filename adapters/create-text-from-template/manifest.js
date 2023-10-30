module.exports = {
  "description": "Creates text using a Mustache template (https://mustache.github.io/).",
  "group": "Transform",
  "subgroup": "Text Manipulation",
  "input": [
    {
      "name": "template",
      "type": "text",
      "description": "The Mustache template text that contains any number of Mustache variable tags. Variable tags are indicated by the double mustaches that surround them, e.g. `{{ person }}` is a tag.",
      "required": true,
    },
    {
      "name": "variables",
      "type": "map",
      "description": "A map of variable names (map keys) with values (map values).",
      "required": true,
    },
  ],
  "output": [
    {
      "name": "text",
      "type": "text",
      "description": "The rendered text.",
    },
  ],
};
