export default {
  "description": "Imports a file from the web.",
  "group": "Transformations",
  "subgroup": "Data Sources",
  "input": [
    {
      "name": "url",
      "type": "text",
      "description": "The URL of the file to be imported.",
      "required": true,
    },
    {
      "name": "output file name",
      "type": "text",
      "description": "The name of the output file.\nIf unspecified, defaults to the remote file name.",
      "required": false,
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
