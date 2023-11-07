module.exports = {
  "description": "Summarises information about specified columns in a datatable.",
  "group": "Transform",
  "subgroup": "Data Tables",
  "input": [
    {
      "name": "data",
      "type": "datatable",
      "description": "The datatable to be summarised.",
      "required": true,
    },
    {
      "name": "columns",
      "type": "list",
      "description": "A list of columns to be summarised.\nIf unspecified, all columns will be summarised.",
      "required": false,
      "ui": { "column-in": "data" },
    },
  ],
  "output": [
    {
      "name": "summary",
      "type": "datatable",
      "description": "A datatable containing rows from both datatables.",
    },
  ],
};
