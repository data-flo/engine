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
      "ui": { "workflow-uuid": true },
    },
  ],
  "output": [
  ],
  "dynamic": true,
};
