module.exports = {
  "description": "Concatenates text to the left and/or the right of the input, then returns the combined text as an output.",
  "group": "Transformations",
  "subgroup": "Text Manipulation",
  "input": [
    {
      "name": "left",
      "type": "text",
      "description": "Text to be joined to the left of the input. Defaults to \"\""
    },
    {
      "name": "right",
      "type": "text",
      "description": "Text to be joined to the right of the input. Defaults to \"\""
    }
  ],
  "output": [
    {
      "name": "combination",
      "type": "text",
      "description": "The combined text."
    }
  ]
}