module.exports = {
  "description": "Imports data from an Epicollect5 project.",
  "group": "Transformations",
  "subgroup": "Data Sources",
  "input": [
    {
      "name": "url",
      "type": "text",
      "description": "The URL of the Epicollect5 project to be imported (e.g. https://five.epicollect.net/project/ec5-demo-project).",
      "required": true,
    },
    {
      "name": "client id",
      "type": "text",
      "description": "The Epicollect5 Client ID to access private projects.\nNot required for public projects.\nSee https://docs.epicollect.net/developers/apps.",
      "required": false,
    },
    {
      "name": "client secret",
      "type": "text",
      "description": "The Epicollect5 Client Secret to access private projects.\nNot required for public projects.\nSee https://docs.epicollect.net/developers/apps.",
      "required": false,
    },
    {
      "name": "map index",
      "type": "text",
      "description": "The index of the mapping to use when importing the data. See https://docs.epicollect.net/web-application/mapping-data.\nIf unspecified, the default mapping is used.",
      "required": false,
    },
  ],
  "output": [
    {
      "name": "data",
      "type": "datatable",
      "description": "A datatable containing the project entries.",
    },
  ],
};
