module.exports = {
  "description": "Creates Microreact projects.",
  "group": "Transformations",
  "subgroup": "Data Destinations",
  "input": [
    {
      "name": "name",
      "type": "text",
      "default": "Unnamed project",
      "description": "The new project's name. Defaults to \"Unnamed project\"."
    },
    {
      "name": "data",
      "type": "text",
      "description": "Text containing data in a .csv format."
    },
    {
      "name": "tree",
      "type": "text",
      "default": null,
      "description": "Text containing data in a .nwk format to build a phylogenetic tree. Defaults to null."
    },
    {
      "name": "network",
      "type": "text",
      "default": null,
      "description": "Text containing data in a .fot format to build a network. Defaults to null."
    },
    {
      "name": "api",
      "type": "text",
      "default": "https://microreact.org/api",
      "description": "The url of the microreact api.\nDefaults to `https://microreact.org/api`."
    },
    {
      "name": "access token",
      "type": "text",
      "description": "An API access token.\nSee https://docs.microreact.org/api/access-tokens."
    },
    {
      "name": "idField",
      "type": "text",
      "default": null,
      "description": "The column, from the data input, that will be used as the id of each row. Defaults to null."
    },
    {
      "name": "timelineField",
      "type": "text",
      "default": null,
      "description": "The column, from the data input, that contains the timeline data. Defaults to null."
    },
    {
      "name": "timelineFormat",
      "type": "text",
      "default": null,
      "description": "How to format the timelineField input. Defaults to null."
    },
    {
      "name": "mapLatitude",
      "type": "text",
      "default": null,
      "description": "The column, from the data input, that contains the latitude data. Defaults to null."
    },
    {
      "name": "mapLongitude",
      "type": "text",
      "default": null,
      "description": "The column, from the data input, that contains the longitude data. Defaults to null."
    }
  ],
  "output": [
    {
      "name": "id",
      "type": "text",
      "description": "The created project's ID."
    },
    {
      "name": "url",
      "type": "url",
      "description": "URL of the created project."
    }
  ]
}