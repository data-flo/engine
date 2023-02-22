export default {
  "description": "Creates a list from values of a datatable column.",
  "group": "Transformations",
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
  ],
  "output": [
    {
      "name": "list",
      "type": "list",
      "description": "A list containing the values from the datatable column.",
    },
  ],
};
