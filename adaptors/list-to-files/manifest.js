module.exports = {
  "description": "Converts lists of text to a list of files.",
  "category": "List Manipulation",
  "input": [
    {
      "name": "list",
      "type": "list",
      "description": "A list of the contents of each file as text."
    },
    {
      "name": "encoding",
      "type": "text",
      "default": "utf8",
      "description": "The character encoding of the input `file`.\nDefaults to `utf8`."
    },
    {
      "name": "names",
      "type": "list",
      "description": "A list of filenames in the same order as the contents parameter.",
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
      "name": "files",
      "type": "list",
      "description": "A list of files with the content from the `list` parameter."
    }
  ]
}
