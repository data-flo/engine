module.exports = {
  "description": "Imports a file from Figshare.",
  "group": "Transformations",
  "subgroup": "Data Sources",
  "input": [
    {
      "name": "url",
      "type": "text",
      "description": "The url of the target Figshare file."
    }
  ],
  "output": [
    {
      "name": "file",
      "type": "file",
      "description": "The imported Figshare file."
    }
  ]
}