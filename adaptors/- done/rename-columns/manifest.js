module.exports = {
  "description": "Renames existing columns in a datatable.",
  "group": "Transformations",
  "subgroup": "Data Tables",
  "input": [
    {
      "name": "data",
      "type": "datatable",
      "description": "The datatable containing columns to be renamed.",

    },
    {
      "name": "column names",
      "type": "map",
      "description": "The mapping of old column names to new ones.",
    },
    {
      "name": "discard unmapped",
      "type": "boolean",
      "description": "Specifies whether to discard columns which are not mapped in `column names`. \nIf unspecified, defaults to `False` (unmapped columns are kept).",
      "default": false,
    },
  ],
  "output": [
    {
      "name": "data",
      "type": "datatable",
      "description": "A datatable with the columns renamed.",
    },
  ],
};
