export default {
  "description": "Creates a sub folder in a parent folder in Google Drive.\nThe parent folder should be either public or shared with `data-flo@data-flo.iam.gserviceaccount.com`, and given `can edit` permission.",
  "group": "Transformations",
  "subgroup": "Data Destinations",
  "input": [
    {
      "name": "parent folder",
      "type": "text",
      "description": "The URL of the parent folder in Google Drive.",
      "required": true,
      "ui": { "type": "url" },
    },
    {
      "name": "folder name",
      "type": "text",
      "description": "The name of the folder to be created.",
      "required": true,
    },
  ],
  "output": [
    {
      "name": "url",
      "type": "text",
      "description": "The Google Drive URL of the created folder.",
    },
    {
      "name": "id",
      "type": "text",
      "description": "The ID of the created folder.",
    },
  ],
};
