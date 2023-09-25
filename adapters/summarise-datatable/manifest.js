module.exports = {
  "description": "Appends the rows of two datatables into a new datatable based on common column names.",
  "group": "Transformations",
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
