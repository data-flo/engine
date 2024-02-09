module.exports = {
  "description": "Imports a file from an Amazon S3 compatible object storage server.",
  "group": "Import",
  "subgroup": "Data Sources",
  "input": [
    {
      "name": "url",
      "type": "text",
      "description": "The URL of the file to be imported, e.g. `https://s3.region-code.amazonaws.com/bucket-name/key-name`.\n See https://docs.aws.amazon.com/AmazonS3/latest/userguide/access-bucket-intro.html#path-style-url-ex.",
      "required": true,
    },
    {
      "name": "access key",
      "type": "text",
      "description": "The access key is the user-id that uniquely identifies your account.\nRequired when the ACL of the object is private.",
      "required": false,
    },
    {
      "name": "secret key",
      "type": "text",
      "description": "The secret key is the password to your account.\nRequired when the ACL of the object is private.",
      "required": false,
      "ui": { "secret": true },
    },
  ],

  "output": [
    {
      "name": "file",
      "type": "file",
      "description": "The downloaded file.",
    },
  ],
};
