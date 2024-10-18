module.exports = {
  "description": "Creates a list from values of a datatable column.",
  "group": "Transform",
  "subgroup": "List Manipulation",
  "input": [
    {
      "name": "data",
      "type": "datatable",
      "description": "The datatable containing the column values.",
      "required": true,
    },
    {
      "name": "column name",
      "type": "text",
      "description": "The name of the column from which the list will be created.",
      "required": true,
      "ui": { "column-in": "data" },
    },
    {
      "name": "unique values",
      "type": "boolean",
      "description": "The names of the columns from which the list will be created.",
      "required": false,
      "default": false,
    },
  ],
  "output": [
    {
      "name": "list",
      "type": "list",
      "description": "A list containing the values from the datatable column.",
    },
  ],
};
