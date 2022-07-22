module.exports = {
  "description": "Splits values in a column into a specified number of columns using a separator to determine where to make each split.",
  "group": "Transformations",
  "subgroup": "Data Tables",
  "input": [
    {
      "name": "data",
      "type": "datatable",
      "description": "The datatable containing the column to be split.",
    },
    {
      "name": "column name",
      "type": "text",
      "description": "The name of the column to be split.",
    },
    {
      "name": "separator",
      "type": "text",
      "description": "The separator text, or regular expression, which denotes the points at which each split should occur.\nThe separator is treated a regular expression if it begins and ends with `/`.",
    },
    {
      "name": "new column names",
      "type": "list",
      "description": "The list of columns to be added.",
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
