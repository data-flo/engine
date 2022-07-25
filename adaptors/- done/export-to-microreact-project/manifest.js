module.exports = {
  "description": "Creates a new project or updates an existing a project on a Microreact server.",
  "group": "Transformations",
  "subgroup": "Data Destinations",
  "input": [
    {
      "name": "project",
      "type": "text",
      "description": "The ID (e.g. `fCXBPv48KNkm5oZq8UWdHG`) or the URL (e.g. `https://microreact.org/project/fCXBPv48KNkm5oZq8UWdHG`) of an existing project to be updated. Leave empty to create a new project.",
    },
    {
      "name": "project name",
      "type": "text",
      "description": "The new project name.\nIf unspecified, defaults to existing project name if there is one, otherwise defaults to \"Unnamed project\".",
    },
    {
      "name": "description",
      "type": "text",
      "default": "",
      "description": "An optional project description in Markdown format.",
    },
    {
      "name": "data file",
      "type": "file",
      "default": null,
      "description": "A data file in one of the supported formats: https://docs.microreact.org/instructions/creating-a-microreact-project/supported-file-formats#data-file-formats.\nLeave empty if using `data url`.",
    },
    {
      "name": "data url",
      "type": "text",
      "default": null,
      "description": "URL linking to a data file in one of the supported formats: https://docs.microreact.org/instructions/creating-a-microreact-project/supported-file-formats#data-file-formats.\nLeave empty if using `data file`.",
    },
    {
      "name": "tree file",
      "type": "text",
      "default": null,
      "description": "A phylogenetic tree file in Newick format.\nLeave empty if using `tree url`.",
    },
    {
      "name": "tree url",
      "type": "text",
      "default": null,
      "description": "URL linking to a tree file in Newick format.\nLeave empty if using `tree file`.",
    },
    {
      "name": "network file",
      "type": "text",
      "default": null,
      "description": "A network file in DOT format.\nLeave empty if using `network url`.",
    },
    {
      "name": "network url",
      "type": "text",
      "default": null,
      "description": "URL linking to a network file in DOT format.\nLeave empty if using `network file`.",
    },
    {
      "name": "server url",
      "type": "text",
      "default": "https://microreact.org/",
      "description": "The URL of the Microreact server on which the project will be created or updated.\nIf unspecified, defaults to `https://microreact.org/`.",
    },
    {
      "name": "access token",
      "type": "text",
      "description": "The API access token for a Microreact account.\nSee https://docs.microreact.org/api/access-tokens.",
    },
    {
      "name": "id column",
      "type": "text",
      "default": null,
      "description": "The column name in `data` that will be used as the unique row ID.\nIf unspecified, defaults to `id`.",
    },
    {
      "name": "timeline column",
      "type": "text",
      "default": null,
      "description": "The column name which contains the timeline data.\nIf unspecified, no timeline will be added when creating a new project.",
    },
    {
      "name": "latitude column",
      "type": "text",
      "default": null,
      "description": "The column name which contains map latitude values.\nIf unspecified, no map will be added when creating a new project.",
    },
    {
      "name": "longitude column",
      "type": "text",
      "default": null,
      "description": "The column name which contains map longitude values.\nIf unspecified, no map will be added when creating a new project.",
    },
  ],
  "output": [
    {
      "name": "id",
      "type": "text",
      "description": "The ID of the Microreact project.",
    },
    {
      "name": "url",
      "type": "url",
      "description": "The URL of the Microreact project.",
    },
  ],
};
