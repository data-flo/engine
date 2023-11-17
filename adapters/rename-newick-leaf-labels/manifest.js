module.exports = {
  "description": "Renames leaf labels in a Newick tree.",
  "group": "Transform",
  "subgroup": "Text Manipulation",
  "input": [
    {
      "name": "newick",
      "type": "text",
      "description": "A tree in Newick format.",
      "required": true,
    },
    {
      "name": "mapping",
      "type": "dictionary",
      "description": "A mapping of existing labels (dictionary keys) with new labels (dictionary values).",
      "required": true,
    },
  ],
  "output": [
    {
      "name": "newick",
      "type": "text",
      "description": "A tree with renamed labels in Newick format.",
    },
  ],
};
