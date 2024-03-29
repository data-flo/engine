module.exports = {
  "description": "Exports a graph as a text file in DOT format (https://en.wikipedia.org/wiki/DOT_(graph_description_language)).",
  "group": "Export",
  "subgroup": "Graph Manipulation",
  "input": [
    {
      "name": "graph",
      "type": "graph",
      "description": "The graph structure to be exported.",
      "required": true,
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
