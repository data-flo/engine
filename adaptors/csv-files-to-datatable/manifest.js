module.exports = {
  "description": "Imports a CSV file and converts to a datatable.",
  "group": "Transformations",
  "subgroup": "Data Tables",
  "input": [
    {
      "name": "files list",
      "type": "files",
      "description": "A file containing a .csv or .tsv formatted data."
    },
    {
      "name": "encoding",
      "type": "text",
      "default": "utf8",
      "description": "The character encoding of the input `file`.\nDefaults to `utf8`."
    },
    {
      "name": "separator",
      "type": "text",
      "default": ",",
      "description": "Character used as column delimiter. Leave blank to auto-detect from a list of most common delimiters. Defaults to \",\" (blank)."
    }
  ],
  "output": [
    {
      "name": "data",
      "type": "datatable",
      "description": "An object containing columns and rows."
    }
  ]
}