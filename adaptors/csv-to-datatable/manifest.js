module.exports = {
  "description": "Converts a CSV string to a datatable.",
  "group": "Transformations",
  "subgroup": "Data Tables",
  "input": [
    {
      "name": "csv",
      "type": "text",
      "description": "A string containing a .csv or .tsv formatted data."
    },
    {
      "name": "separator",
      "type": "text",
      "default": "",
      "description": "Character used as column delimiter. Leave blank to auto-detect from a list of most common delimiters. Defaults to \"\" (blank)."
    },
    {
      "name": "newline",
      "type": "text",
      "default": "",
      "description": "Character used as row delimiter. Leave blank to auto-detect. Must be one of '\r', '\n', or '\r\n'. Defaults to \"\" (blank)."
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