module.exports = {
  "description": "Exports a graph as a text file in DOT format (https://en.wikipedia.org/wiki/DOT_(graph_description_language)).",
  "group": "Transformations",
  "subgroup": "Graph Manipulation",
  "input": [
    {
      "name": "graph",
      "type": "graph",
      "description": "The graph structure to be exported.",
    },
  ],
  "output": [
    {
      "name": "dot",
      "type": "text",
      "description": "A text file in DOT format (`.dot`).",
    },
  ],
};
