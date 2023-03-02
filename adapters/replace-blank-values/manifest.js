module.exports = {
  "description": "Replaces blank values in a datatable column.",
  "group": "Transformations",
  "subgroup": "Data Tables",
  "input": [
    {
      "name": "data",
      "type": "datatable",
      "description": "The datatable containing blank values.",
      "required": true,
    },
    {
      "name": "columns",
      "type": "list",
      "description": "The names of the columns in `data` containing blank values.",
      "required": true,
      "ui": { "column-in": "data" },
    },
    {
      "name": "new value",
      "type": "text",
      "description": "A value to replace blank values.",
      "required": true,
    },
  ],
  "output": [
    {
      "name": "data",
      "type": "datatable",
      "description": "A datatable with the blank values replaced.",
    },
  ],
};
