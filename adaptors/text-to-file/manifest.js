module.exports = {
  "description": "Converts text a text to a file stream.",
  "group": "Transformations",
  "subgroup": "Text Manipulation",
  "input": [
    {
      "name": "text",
      "type": "text",
      "description": "The contents of the file as text."
    },
    {
      "name": "encoding",
      "type": "text",
      "default": "utf8",
      "description": "The character encoding of the input `file`.\nDefaults to `utf8`."
    },
    {
      "name": "name",
      "type": "text",
      "description": "An optional file name. \nDefaults to `Unnamed`.",
      "default": "Unnamed"
    },
    {
      "name": "media type",
      "type": "text",
      "description": "An optional MIME type describing the file content. \nDefaults to `text/plain`.",
      "default": "text/plain"
    }
  ],
  "output": [
    {
      "name": "file",
      "type": "file",
      "description": "A file stream with specified text content."
    }
  ]
}