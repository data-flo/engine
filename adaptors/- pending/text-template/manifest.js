module.exports = {
  "description": "Renders a Mustache template and returns rendered text.",
  "group": "Transformations",
  "subgroup": "Text Manipulation",
  "input": [
    {
      "name": "template",
      "type": "text",
      "description": "A mustache (https://mustache.github.io/) template, a text that contains any number of mustache variable tags. Variable tags are indicated by the double mustaches that surround them. `{{ person }}` is a tag."
    },
    {
      "name": "variables",
      "type": "map",
      "description": "A map where keys are the variable names and values are the variable values."
    }
  ],
  "output": [
    {
      "name": "output",
      "type": "text",
      "description": "The rendered text."
    }
  ]
}