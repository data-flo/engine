module.exports = {
  "description": "Adds new columns to an existing datatable.",
  "group": "Transform",
  "subgroup": "Data Tables",
  "input": [
    {
      "name": "data",
      "type": "datatable",
      "description": "The datatable to which the new columns will be added.",
      "required": true,
    },
    {
      "name": "column names",
      "type": "list",
      "description": "The names of the new columns to be added.",
      "required": true,
    },
    {
      "name": "value",
      "type": "text",
      "description": "A value to be added the cells of the new columns.\nIf unspecified, empty values will be added.",
      "required": false,
      "default": "",
    },
  ],
  "output": [
    {
      "name": "data",
      "type": "datatable",
      "description": "A datatable with the new column added.",
    },
  ],
};
