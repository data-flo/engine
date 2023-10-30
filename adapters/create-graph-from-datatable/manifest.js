module.exports = {
  "description": "Creates a graph structure from a datatable containing edge data.",
  "group": "Transform",
  "subgroup": "Graph Manipulation",
  "input": [
    {
      "name": "data",
      "type": "datatable",
      "description": "The datatable containing edge data.",
      "required": true,
    },
    {
      "name": "from column",
      "type": "text",
      "description": "The name of the column containing the origin node of the edge.",
      "required": true,
    },
    {
      "name": "to column",
      "type": "text",
      "description": "The name of the column containing the destination node of the edge.",
      "required": true,
    },
    {
      "name": "directed",
      "type": "boolean",
      "description": "Specifies whether the graph is directed or not.\nIf unspecified, defaults to `False`.",
      "required": false,
      "default": false,
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
