module.exports = {
  "description": "Imports a file from Figshare (https://figshare.com).",
  "group": "Import",
  "subgroup": "Data Sources",
  "input": [
    {
      "name": "url",
      "type": "text",
      "description": "The URL of the Figshare file to be imported (e.g. https://figshare.com/articles/dataset/Mykrobe_Panel_Staph_version_20201001/13033103). You can get this URL from the address bar in your browser.",
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
