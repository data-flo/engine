module.exports = {
  "description": "Reshapes rows in wide format to long format.",
  "group": "Transform",
  "subgroup": "Data Tables",
  "input": [
    {
      "name": "data",
      "type": "datatable",
      "description": "The datatable in wide format.",
      "required": true,
    },
    {
      "name": "static columns",
      "type": "list",
      "description": "The list of columns which will not be reshaped.\nIf unspecified, all columns will be reshaped",
      "required": false,
    },
    {
      "name": "key column name",
      "type": "text",
      "description": "The name of the column to which keys are added.\nIf unspecified, defaults to `key`.",
      "required": false,
      "default": "key",
    },
    {
      "name": "value column name",
      "type": "text",
      "description": "The name of the column to which values are added.\nIf unspecified, defaults to `value`.",
      "required": false,
      "default": "value",
    },
  ],
  "output": [
    {
      "name": "data",
      "type": "datatable",
      "description": "A datatable in long format.",
    },
  ],
};
