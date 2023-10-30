module.exports = {
  "description": "Splits values in a column into a specified number of columns using a separator to determine where to make each split.",
  "group": "Transform",
  "subgroup": "Data Tables",
  "input": [
    {
      "name": "data",
      "type": "datatable",
      "description": "The datatable containing the column to be split.",
      "required": true,
    },
    {
      "name": "column name",
      "type": "text",
      "description": "The name of the column to be split.",
      "required": true,
      "ui": { "column-in": "data" },
    },
    {
      "name": "separator",
      "type": "text",
      "description": "The separator text, or regular expression, which denotes the points at which each split should occur.\nThe separator is treated a regular expression if it begins and ends with `/`.",
      "required": true,
    },
    {
      "name": "new column names",
      "type": "list",
      "description": "The list of columns to be added.",
      "required": true,
    },
  ],
  "output": [
    {
      "name": "data",
      "type": "datatable",
      "description": "A datatable with new columns added.",
    },
  ],
};
