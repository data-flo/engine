module.exports = {
  "description": "Finds and replaces a value in specified columns of a datatable.\nThe pattern can be a test or a regular expression.\nIf pattern is a text, only the first occurrence will be replaced.",
  "group": "Transformations",
  "subgroup": "Data Tables",
  "input": [
    {
      "name": "data",
      "type": "datatable",
      "description": "A datatable to be searched."
    },
    {
      "name": "pattern",
      "type": "text",
      "description": "A text or a regular expression to be replaced.\nRegular expressions must be wrapped with `/` character (e.g. `/.*/`)."
    },
    {
      "name": "ignore case",
      "type": "boolean",
      "description": "Whether lowercase and uppercase letters should be treated as equivalent.\nDefaults to `True`.",
      "default": true
    },
    {
      "name": "replacement",
      "type": "text",
      "description": "A text that replaces the substring matched by the specified `pattern`.\nIf unspecified, matches will be replaced with a blank text (i.e. `\"\"`).",
      "default": ""
    },
    {
      "name": "columns",
      "type": "list",
      "description": "A list of columns in `data` to be searched.\nIf unspecified, it defaults to all columns in `data`.",
      "default": null
    }
  ],
  "output": [
    {
      "name": "data",
      "type": "datatable",
      "description": "A new datatable with target column added."
    }
  ]
}