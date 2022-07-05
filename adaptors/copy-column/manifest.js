module.exports = {
  "description": "Adds a new column to an existing datatable.",
  "group": "Transformations",
  "subgroup": "Data Tables",
  "input": [
    {
      "name": "data",
      "type": "datatable",
      "description": "The datatable to which the new column will be added.",
      "required": true,
    },
    {
      "name": "column",
      "type": "text",
      "description": "The name of the new column to be added.",
      "required": true,
      "subtype": { "column": "data" },
    },
    {
      "name": "value",
      "type": "text",
      "description": "A value to be added to the column cells.\nIf unspecified, empty values will be added.",
      "required": false,
      "default": "",
    },
  ],
  "output": [
    {
      "name": "data",
      "type": "datatable",
      "description": "A new datatable with the new column added.",
    },
  ],
};
