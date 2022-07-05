module.exports = {
  "description": "Concatenate values from two or more columns",
  "group": "Transformations",
  "subgroup": "Data Tables",
  "input": [
    {
      "name": "data",
      "type": "datatable",
      "description": "The datatable containing the columns to be concatenated.",
      "required": true,
    },
    {
      "name": "columns",
      "type": "list",
      "description": "A list of columns to be concatenated. The output value matches the listed order.",
      "required": true,
    },
    {
      "name": "separator",
      "type": "text",
      "description": "Specifies text to separate each concatenated value. Defaults to `\"\"` (blank).",
      "required": false,
      "default": "",
    },
    {
      "name": "concatenated column",
      "type": "text",
      "description": "The new column containing concatenated values.",
    },
  ],
  "output": [
    {
      "name": "data",
      "type": "datatable",
      "description": "A datatable with the concatenated column added.",
    },
  ],
};
