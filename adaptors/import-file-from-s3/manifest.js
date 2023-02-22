export default {
  "description": "Imports a file from an Amazon S3 compatible object storage server.",
  "group": "Transformations",
  "subgroup": "Data Sources",
  "input": [
    {
      "name": "url",
      "type": "text",
      "description": "The URL of the file to be imported, e.g. `https://bucket-name.s3.example.com/file/path`.",
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
