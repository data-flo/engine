module.exports = {
  "description": "Replaces values in source column with some or all matches of a pattern replaced by a replacement. The pattern can be a test or a regular expression. If pattern is a text, only the first occurrence will be replaced. Replacement values are added to target column.",
  "group": "Transformations",
  "subgroup": "Data Tables",
  "input": [
    {
      "name": "data",
      "type": "datatable",
      "description": "A datatable to be searched."

    },
    {
      "name": "source",
      "type": "text",
      "description": "The name of a column in data to be searched."
    },
    {
      "name": "pattern",
      "type": "text",
      "description": "A text or a regular expression to be replaced. Regular expressions must be wrapped with `/` character (e.g. `/.*/`)."
    },
    {
      "name": "replacement",
      "type": "text",
      "description": "A text that replaces the substring specified by the specified `pattern` parameter."
    },
    {
      "name": "target",
      "type": "text",
      "description": "The name of the column to which replacement values are added.\nDefaults to `source` column.",
      "default": null
    }
  ],
  "output": [
    {
      "name": "data",
      "type": "datatable",
      "description": "A datatable with target column added."
    }
  ]
}