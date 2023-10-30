module.exports = {
  "description": "Exports a file to a shared network drive using standard SMB/CIFS protocol.",
  "group": "Export",
  "subgroup": "Data Destinations",
  "input": [
    {
      "name": "file",
      "type": "file",
      "description": "The file to be exported.",
      "required": true,
    },
    {
      "name": "share address",
      "type": "text",
      "description": "The name of the service to which you want to connect.\nTakes the form of `\\\\server\\service`, `//server/service`, or `smb://server/service` where `server` is the host name or IP address of the SMB/CIFS server, and `service` is the name of the service offered by the server.",
      "required": true,
    },
    {
      "name": "port",
      "type": "number",
      "description": "The port of the SMB server.\nIf unspecified, defaults to `445`.",
      "required": true,
      "default": 445,
    },
    {
      "name": "domain",
      "type": "text",
      "description": "the domain of which the user is registered.\ne.g. `WORKGROUP`.",
      "required": false,
    },
    {
      "name": "username",
      "type": "text",
      "description": "The username required to access the specified service on the server.\nIf unspecified, defaults to `guest`.",
      "required": false,
      "default": "",
    },
    {
      "name": "password",
      "type": "text",
      "description": "The password required to access the specified service on the server.",
      "required": false,
      "default": "",
    },
    {
      "name": "file path",
      "type": "text",
      "description": "The relative path (e.g. `folder\\file.txt`) or the absolute path (e.g. `\\\\server\\service\\folder\\file.txt`) of the destination file.",
      "required": true,
    },
    {
      "name": "overwrite",
      "type": "boolean",
      "description": "Specifies whether to overwrite any existing file.\nIf unspecified, defaults to `False`.",
      "required": false,
      "default": false,
    },
  ],
  "output": [
    {
      "name": "file",
      "type": "file",
      "description": "The exported file.",
    },
  ],
};
