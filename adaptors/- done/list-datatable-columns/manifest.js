module.exports = {
  "description": "Creates a list of datatable column names.",
  "group": "Transformations",
  "subgroup": "Data Tables",
  "input": [
    {
      "name": "data",
      "type": "datatable",
      "description": "The datatable containing columns to be listed.",
      "required": true,
    },
  ],
  "output": [
    {
      "name": "column names",
      "type": "list",
      "description": "The list of column names.",
    },
  ],
};
