module.exports = {
  "description": "Imports a file from a SMB/CIFS server.",
  "group": "Transformations",
  "subgroup": "Data Sources",
  "input": [
    {
      "name": "share",
      "type": "text",
      "description": "The name of the service to which you want to connect.\nTakes the form of `\\\\server\\service`, `//server/service`, or `smb://server/service` where server is the host name or IP address of the SMB/CIFS server, the service is the name of the service offered by the server.",
    },
    {
      "name": "port",
      "type": "number",
      "description": "The port of the SMB server.\nIf unspecified, defaults to `445`.",
      "default": 445,
    },
    {
      "name": "domain",
      "type": "text",
      "description": "The domain on which the user is registered.\ne.g. `WORKGROUP`.",
      "default": "",
    },
    {
      "name": "username",
      "type": "text",
      "description": "The username required to access the specified service on the server.",
      "default": "",
    },
    {
      "name": "password",
      "type": "text",
      "description": "The password required to access the specified service on the server.",
      "default": "",
    },
    {
      "name": "file path",
      "type": "text",
      "description": "The relative path (e.g. `folder\\file.txt`) or the absolute path (e.g. `\\\\server\\service\\folder\\file.txt`) of the file to be imported.",
    },
  ],
  "output": [
    {
      "name": "file",
      "type": "file",
      "description": "The imported file.",
    },
  ],
};