module.exports = {
  "description": "Converts a datatable to a graph.",
  "group": "Transformations",
  "subgroup": "Graph Manipulation",
  "input": [
    {
      "name": "data",
      "type": "datatable",
      "description": "An object containing columns and rows."
    },
    {
      "name": "from",
      "type": "text",
      "description": "The key of the value you wish to start from."
    },
    {
      "name": "to",
      "type": "text",
      "description": "The key of the value you wish to end at."
    },
    {
      "name": "direction",
      "type": "text",
      "default": "none",
      "description": "Defaults to \"none\"."
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