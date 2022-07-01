module.exports = {
  "description": "Parses a DOT string as a graph.",
  "group": "Transformations",
  "subgroup": "Graph Manipulation",
  "input": [
    {
      "name": "dot",
      "type": "text",
      "description": "Text in the .dot format."
    }
  ],
  "output": [
    {
      "name": "graph",
      "type": "graph",
      "description": "An object containing nodes and edges."
    }
  ]
}