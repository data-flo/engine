module.exports = {
  "description": "Converts a file to text.",
  "group": "Transformations",
  "subgroup": "Text Manipulation",
  "input": [
    {
      "name": "file",
      "type": "file",
      "description": "A file to be converted to text."
    },
    {
      "name": "encoding",
      "type": "text",
      "default": "utf8",
      "description": "The method of converting the file's data. \nSupported encodings are: `ascii`, `base64`, `binary`, `hex`, `ucs2`, `utf8`, or `latin1` \nDefaults to `utf8`"
    }
  ],
  "output": [
    {
      "name": "text",
      "type": "text",
      "description": "The contents of the file as text."
    }
  ]
}