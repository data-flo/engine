module.exports = {
  "description": "Imports a file from Figshare (https://figshare.com).",
  "group": "Transformations",
  "subgroup": "Data Sources",
  "input": [
    {
      "name": "url",
      "type": "text",
      "description": "The URL of the Figshare file to be imported (e.g. https://figshare.com/articles/Tree/4080564).",
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
