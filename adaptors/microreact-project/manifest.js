module.exports = {
  "description": "Extracts data from a Microreact project.",
  "group": "Transformations",
  "subgroup": "Data Sources",
  "input": [
    {
      "name": "url",
      "type": "text",
      "description": "A valid Microreact project (e.g. https://microreact.org/project/Ny8H4gsH)."
    }
  ],
  "output": [
    {
      "name": "data",
      "type": "datatable",
      "description": "All project data rows."
    },
    {
      "name": "sourceUrl",
      "type": "text",
      "description": "Microreact viewer API URL."
    }
  ]
}