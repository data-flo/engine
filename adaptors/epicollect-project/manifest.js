module.exports = {
  "description": "Extracts data from an Epicollect5 project.",
  "group": "Transformations",
  "subgroup": "Data Sources",
  "input": [
    {
      "name": "url",
      "type": "text",
      "description": "A valid Epicollect5 project URL (e.g. https://five.epicollect.net/project/ec5-demo-project)."
    },
    {
      "name": "client id",
      "type": "text",
      "description": "The Epicollect5 Client ID to access private projects.\nNot required for public projects.\nSee https://epicollect5.gitbooks.io/epicollect5-api/content/client-credentials-grant/create-client-app.html.",
      "default": null
    },
    {
      "name": "client secret",
      "type": "text",
      "description": "The Epicollect5 Client Secret to access private projects.\nNot required for public projects.\nSee https://epicollect5.gitbooks.io/epicollect5-api/content/client-credentials-grant/create-client-app.html.",
      "default": null
    },
    {
      "name": "map index",
      "type": "text",
      "description": "The index of the mapping to use. Default: 0",
      "default": "0"
    }
  ],
  "output": [
    {
      "name": "slug",
      "type": "text",
      "description": "Project slug."
    },
    {
      "name": "data",
      "type": "datatable",
      "description": "All project entries."
    }
  ]
}