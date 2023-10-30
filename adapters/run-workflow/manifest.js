module.exports = {
  "description": "Runs another Data-flo workflow.",
  "group": "Transform",
  "subgroup": "Workflows",
  "input": [
    {
      "name": "workflow",
      "type": "text",
      "description": "The ID or the URL of the workflow to run.",
      "required": true,
      "ui": { "workflow-uuid": true },
    },
  ],
  "output": [
  ],
  "dynamic": true,
};
