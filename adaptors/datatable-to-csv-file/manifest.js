module.exports = {
  "description": "Converts a datatable to a CSV string.",
  "group": "Transformations",
  "subgroup": "Data Tables",
  "input": [
    {
      "name": "data",
      "type": "datatable",
      "description": "An object containing columns and rows."
    },
    {
      "name": "separator",
      "type": "text",
      "default": ",",
      "description": "Character used as column delimiter.\nDefaults to `,`."
    },
    {
      "name": "newline",
      "type": "text",
      "default": "\n",
      "description": "Character used as row delimiter.\nDefaults to `\\n` (newline)."
    },
    {
      "name": "columns",
      "type": "list",
      "description": "A list of columns to be included in the CSV text.\nDefaults to `null` (all columns).",
      "default": null
    },
    {
      "name": "filename",
      "type": "text",
      "default": "data.csv",
      "description": "The name of the output file.\nDefaults to `data.csv`."
    }
  ],
  "output": [
    {
      "name": "csv",
      "type": "file",
      "description": "A text file in CSV format."
    }
  ]
}