module.exports = {
  "description": "Creates a sub folder in a parent Google Drive.\nThe parent folder should be shared to with `data-flo@data-flo.iam.gserviceaccount.com` and given `can edit` permission.",
  "group": "Transformations",
  "subgroup": "Data Destinations",
  "input": [
    {
      "name": "parent",
      "type": "url",
      "description": "The URL of the parent folder on Google Drive."
    },
    {
      "name": "name",
      "type": "text",
      "description": "The name of the folder to create."
    }
  ],
  "output": [
    {
      "name": "url",
      "type": "url",
      "description": "The Google Drive URL of the created folder."
    },
    {
      "name": "id",
      "type": "text",
      "description": "The ID of the created folder."
    }
  ]
}