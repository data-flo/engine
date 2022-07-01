module.exports = {
  "description": "Imports a file from Dropbox.",
  "group": "Transformations",
  "subgroup": "Data Sources",
  "input": [
    {
      "name": "url",
      "type": "text",
      "description": "The url of the target Dropbox file."
    }
  ],
  "output": [
    {
      "name": "file",
      "type": "file",
      "description": "The imported Dropbox file."
    }
  ]
}