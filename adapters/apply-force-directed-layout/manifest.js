module.exports = {
  "description": "Applies a force-directed graph drawing algorithm (https://en.wikipedia.org/wiki/Force-directed_graph_drawing) on a specified graph.",
  "group": "Transformations",
  "subgroup": "Graph Manipulation",
  "input": [
    {
      "name": "graph",
      "type": "graph",
      "description": "The graph structure.",
      "required": true,
    },
    {
      "name": "stiffness",
      "type": "number",
      "description": "Defaults to 400.0.",
      "required": false,
      "default": 400.0,
    },
    {
      "name": "repulsion",
      "type": "number",
      "description": "How much each node should node push each other away.\nIf unspecified, defaults to 400.0.",
      "required": false,
      "default": 400.0,
    },
    {
      "name": "damping",
      "type": "number",
      "description": "The amount to lessen the force to be applied.\nIf unspecified, defaults to 0.5.",
      "required": false,
      "default": 0.5,

    },
    {
      "name": "min energy threshold",
      "type": "number",
      "description": "The minimum amount of force that should be applied.\nIf unspecified, defaults to null.",
      "required": false,
      "default": null,
    },
    {
      "name": "max speed",
      "type": "number",
      "description": "The maximum amount of speed that should be applied.\nIf unspecified, defaults to null.",
      "required": false,
      "default": null,
    },
  ],
  "output": [
    {
      "name": "graph",
      "type": "graph",
      "description": "A force-directed graph drawing.",
    },
  ],
};
