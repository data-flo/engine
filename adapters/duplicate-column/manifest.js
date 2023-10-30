module.exports = {
  "description": "Duplicates a column in a datatable.",
  "group": "Transform",
  "subgroup": "Data Tables",
  "input": [
    {
      "name": "data",
      "type": "datatable",
      "description": "The datatable containing the column to be duplicated.",
      "required": true,
    },
    {
      "name": "column name",
      "type": "text",
      "description": "The name of the column to be duplicated.",
      "required": true,
      "ui": { "column-in": "data" },
    },
    {
      "name": "new column name",
      "type": "text",
      "description": "The name of the new column.",
      "required": true,
    },
  ],
  "output": [
    {
      "name": "data",
      "type": "datatable",
      "description": "A datatable with the duplicated column.",
    },
  ],
};
