module.exports = {
  "description": "Imports a Google sheet and convert it to a datatable.",
  "group": "Transformations",
  "subgroup": "Data Sources",
  "input": [
    {
      "name": "url",
      "type": "text",
      "description": "The url of the target Google sheet."
    }
  ],
  "output": [
    {
      "name": "file",
      "type": "file",
      "description": "The imported Google sheet."
    }
  ]
}