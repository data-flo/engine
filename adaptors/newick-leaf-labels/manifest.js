module.exports = {
  "description": "Gets the leaf labels from a Newick tree.",
  "group": "Transformations",
  "subgroup": "Text Manipulation",
  "input": [
    {
      "name": "newick",
      "type": "text",
      "description": "A tree in Newick format."
    }
  ],
  "output": [
    {
      "name": "labels",
      "type": "list",
      "description": "A list of leaf labels."
    }
  ]
}