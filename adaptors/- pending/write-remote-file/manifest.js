module.exports = {
  "description": "Stores a file to a remote network server.",
  "group": "Transformations",
  "subgroup": "Data Sources",
  "input": [
    {
      "name": "address",
      "type": "text",
      "description": "The full address of file on the network.\nTakes the form of `\\\\server\\path\\file.txt` or `//server/path/file.text` where server is either a host name or an IP address."
    },
    {
      "name": "file",
      "type": "file",
      "description": "The file to be written."
    },
    {
      "name": "encoding",
      "type": "text",
      "default": null,
      "description": "The character encoding of the input `file`.\nDefaults to `utf8`."
    }
  ],
  "output": [
    {
      "name": "file",
      "type": "file",
      "description": "The written file."
    }
  ]
}