module.exports = {
  "description": "Imports a file from Dropbox.",
  "group": "Transformations",
  "subgroup": "Data Sources",
  "input": [
    {
      "name": "url",
      "type": "text",
      "description": "The URL of the Dropbox file to be imported.",
      "required": true,
    },
  ],
  "output": [
    {
      "name": "file",
      "type": "file",
      "description": "The imported file.",
    },
  ],
};
