module.exports = {
  "description": "Creates a graph structure from text in DOT language format.",
  "group": "Transformations",
  "subgroup": "Graph Manipulation",
  "input": [
    {
      "name": "dot",
      "type": "text",
      "description": "The text in DOT language format.\n See: https://en.wikipedia.org/wiki/DOT_(graph_description_language).",
    },
  ],
  "output": [
    {
      "name": "graph",
      "type": "graph",
      "description": "A graph structure defining nodes and edges.",
    },
  ],
};
