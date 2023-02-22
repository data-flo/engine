export default {
  "description": "Exports a file to a folder on Google Drive.\nThe folder should be shared with `data-flo@data-flo.iam.gserviceaccount.com` and given `can edit` permission.",
  "group": "Transformations",
  "subgroup": "Data Destinations",
  "input": [
    {
      "name": "file",
      "type": "file",
      "description": "The file to be exported.",
    },
    {
      "name": "file url",
      "type": "url",
      "description": "The URL of an existing file on Google Drive to be updated. Leave empty to create a new file.",
      "default": null,
    },
    {
      "name": "folder url",
      "type": "url",
      "description": "The URL of the destination folder on Google Drive. Leave empty if updating a file.",
      "default": null,
    },
    {
      "name": "output file name",
      "type": "text",
      "description": "The name of the file to be created on Google Drive.",
      "default": null,
    },
  ],
  "output": [
    {
      "name": "url",
      "type": "url",
      "description": "The Google Drive URL of the exported file.",
    },
    {
      "name": "id",
      "type": "text",
      "description": "The Google Drive ID of the exported file.",
    },
  ],
};
