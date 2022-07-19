module.exports = {
  "description": "Removes specified columns from a datatable.",
  "group": "Transformations",
  "subgroup": "Data Tables",
  "input": [
    {
      "name": "data",
      "type": "datatable",
      "description": "The datatable containing the columns to be removed.",
    },
    {
      "name": "columns",
      "type": "list",
      "description": "The list of columns to be removed.",
    },
  ],
  "output": [
    {
      "name": "data",
      "type": "datatable",
      "description": "A datatable with the specified columns removed.",
    },
  ],
};
