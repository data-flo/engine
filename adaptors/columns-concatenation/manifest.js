module.exports = {
  "description": "Concatenate a columns values into a new column.",
  "group": "Transformations",
  "subgroup": "Data Tables",
  "input": [
    {
      "name": "data",
      "type": "datatable",
      "description": "The datatable you want to concatenate on to."
    },
    {
      "name": "columns",
      "type": "list",
      "description": "A list of columns from the data."
    },
    {
      "name": "delimiter",
      "type": "text",
      "description": "Specifies a text to separate each value. Defaults to `\"\"` (blank).",
      "default": ""
    },
    {
      "name": "prefix",
      "type": "text",
      "description": "Specifies a text to be prefixed to each concatenated value. Defaults to `\"\"` (blank).",
      "default": ""
    },
    {
      "name": "postfix",
      "type": "text",
      "description": "Specifies a text to be postfixed to each concatenated value. Defaults to `\"\"` (blank).",
      "default": ""
    },
    {
      "name": "target",
      "type": "text",
      "description": "The name of the new column."
    }
  ],
  "output": [
    {
      "name": "data",
      "type": "datatable",
      "description": "The data with the newly concatenated data and target column added."
    }
  ]
}