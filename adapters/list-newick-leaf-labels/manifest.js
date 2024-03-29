module.exports = {
  "description": "Gets the leaf labels from a Newick tree.",
  "group": "Transform",
  "subgroup": "Text Manipulation",
  "input": [
    {
      "name": "newick",
      "type": "text",
      "description": "A tree in Newick format.",
      "required": true,
    },
  ],
  "output": [
    {
      "name": "labels",
      "type": "list",
      "description": "A list of leaf labels.",
    },
  ],
};
