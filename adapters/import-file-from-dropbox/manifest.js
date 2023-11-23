module.exports = {
  "description": "Imports a file from Dropbox.",
  "group": "Import",
  "subgroup": "Data Sources",
  "input": [
    {
      "name": "url",
      "type": "text",
      "description": "The URL of the Dropbox file to be imported. You can find this in Dropbox by getting a share link for the file.",
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
