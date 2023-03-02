module.exports = {
  "description": "Exports a file to a folder on Google Drive.\nThe folder should be shared with `data-flo@data-flo.iam.gserviceaccount.com` and given `can edit` permission.",
  "group": "Transformations",
  "subgroup": "Data Destinations",
  "input": [
    {
      "name": "file",
      "type": "file",
      "description": "The file to be exported.",
      "required": true,
    },
    {
      "name": "file url",
      "type": "url",
      "description": "The URL of an existing file on Google Drive to be updated. Leave empty to create a new file.",
      "required": false,
    },
    {
      "name": "folder url",
      "type": "url",
      "description": "The URL of the destination folder on Google Drive. Leave empty when updating a file.",
      "required": false,
    },
    {
      "name": "output file name",
      "type": "text",
      "description": "The name of the file to be on Google Drive.",
      "required": false,
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
