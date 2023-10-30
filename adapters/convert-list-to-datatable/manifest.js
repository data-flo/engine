module.exports = {
  "description": "Converts a list to a single-column datatable.",
  "group": "Transform",
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
      "description": "The name of the new datatable column.\nIf unspecified, defaults to `value`.",
      "required": false,
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
