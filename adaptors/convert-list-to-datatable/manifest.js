module.exports = {
  "description": "Converts a list to a single-column datatable.",
  "group": "Transformations",
  "subgroup": "List Manipulation",
  "input": [
    {
      "name": "list",
      "type": "list",
      "description": "The list to be converted to a datatable.",
      "required": true,
    },
    {
      "name": "column name",
      "type": "text",
      "description": "The name of the datatable column containing the list.\nIf unspecified, defaults to `value`.",
      "required": true,
      "default": "value",
    },
  ],
  "output": [
    {
      "name": "data",
      "type": "datatable",
      "description": "A single-column datatable containing the list values.",
    },
  ],
};
