module.exports = {
  "description": "Runs a data-flo adaptor(s) from another Workflow within the current Workflow. This adaptor applies the reference Workflow adaptors to each row of your current Workflow.",
  "group": "Workflows",
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
