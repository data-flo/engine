module.exports = {
  "description": "Converts a graph to a DOT string.",
  "group": "Transformations",
  "subgroup": "Graph Manipulation",
  "input": [
    {
      "name": "graph",
      "type": "graph",
      "description": "An object containing nodes and edges."
    }
  ],
  "output": [
    {
      "name": "dot",
      "type": "text",
      "description": "Text in the .dot format."
    }
  ]
}