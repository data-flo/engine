module.exports = {
  "description": "Runs another Workflow.",
  "group": "Transformations",
  "subgroup": "Workflows",
  "input": [
    {
      "name": "workflow",
      "type": "text",
      "description": "The ID or the URL of the Workflow to run.",
      "required": true,
      "ui": { "workflow": true },
    },
  ],
  "output": [
    {
      "name": "run time",
      "type": "text",
      "description": "Run time of the Workflow.",
    },
  ],
};
