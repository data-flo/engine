module.exports = {
  "description": "Imports metadata table from a Microreact project.",
  "group": "Import",
  "subgroup": "Data Sources",
  "input": [
    {
      "name": "project",
      "type": "text",
      "description": "The URL of the Microreact project to be imported (e.g. https://microreact.org/project/Ny8H4gsH).",
      "required": true,
    },
  ],
  "output": [
    {
      "name": "data",
      "type": "datatable",
      "description": "A datatable containing the project data rows.",
    },
  ],
};
