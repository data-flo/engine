module.exports = {
  "description": "Creates Microreact projects.",
  "group": "Transformations",
  "subgroup": "Data Destinations",
  "input": [
    {
      "name": "name",
      "type": "text",
      "default": "Unnamed project",
      "description": "The project name.\nDefaults to \"Unnamed project\"."
    },
    {
      "name": "description",
      "type": "text",
      "default": "",
      "description": "An optional Markdown description."
    },
    {
      "name": "data",
      "type": "text",
      "description": "Data in CSV format or a URL linking to a CSV file."
    },
    {
      "name": "tree",
      "type": "text",
      "default": null,
      "description": "An optional phylogenetic tree in Newick format or a URL linking to a Newick file."
    },
    {
      "name": "network",
      "type": "text",
      "default": null,
      "description": "An optional network in DOT format or a URL linking to a DOT file."
    },
    {
      "name": "api",
      "type": "text",
      "default": "https://microreact.org/api",
      "description": "The URL of the Microreact server API.\nDefaults to `https://microreact.org/api`."
    },
    {
      "name": "access token",
      "type": "text",
      "description": "An API access token.\nSee https://docs.microreact.org/api/access-tokens."
    },
    {
      "name": "id column",
      "type": "text",
      "default": null,
      "description": "The column name that will be used as the ID.\nDefaults to `id`."
    },
    {
      "name": "timeline column",
      "type": "text",
      "default": null,
      "description": "The column name which contains the timeline data.\nDefaults to null."
    },
    {
      "name": "latitude column",
      "type": "text",
      "default": null,
      "description": "The column name which contains map latitude values.\nDefaults to null."
    },
    {
      "name": "longitude column",
      "type": "text",
      "default": null,
      "description": "The column name which contains map longitude values.\nDefaults to null."
    }
  ],
  "output": [
    {
      "name": "id",
      "type": "text",
      "description": "The ID of the newly created project."
    },
    {
      "name": "url",
      "type": "url",
      "description": "The URL of the newly created project."
    }
  ]
}