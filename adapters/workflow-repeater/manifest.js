module.exports = {
  "description": "Runs a Workflow for each row in a datatable.",
  "group": "Transformations",
  "subgroup": "Workflows",
  "input": [
    {
      "name": "data",
      "type": "datatable",
      "description": "The datatable.",
      "required": true,
    },
    {
      "name": "workflow",
      "type": "text",
      "description": "The ID or the URL of the Workflow to run.",
      "required": true,
      "ui": { "workflow-uuid": true },
    },
  ],
  "output": [
    {
      "name": "data",
      "type": "datatable",
      "description": "The datatable.",
      "required": true,
    },
  ],
  "dynamic": true,
};
