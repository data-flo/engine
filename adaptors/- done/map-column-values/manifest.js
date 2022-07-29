const { UnmappedValues } = require("../../../enums");

module.exports = {
  "description": "Adds a new column to a datatable by mapping values of an existing column.",
  "group": "Transformations",
  "subgroup": "Data Tables",
  "input": [
    {
      "name": "data",
      "type": "datatable",
      "description": "The columns and rows.",
    },
    {
      "name": "original column",
      "type": "text",
      "description": "The name of an existing column containing values to be mapped.",
    },
    {
      "name": "new column",
      "type": "text",
      "description": "The name of the new column to which the mapped values will be written.\nIf unspecified, mapped values will be written to the original column.",
    },
    {
      "name": "values",
      "type": "map",
      "description": "The map of existing values with new values, where the map keys are the existing values in original column, and the map values are the corresponding values to be written to new column.",
    },

    {
      "name": "unmapped values",
      "type": "text",
      "description": "Specifies what values to write in new column when original column values are not included as map keys.\nIf unspecified, defaults to `Replace original value with blank`.",
      "required": false,
      "default": "blank",
      "ui": { "must-be-one-of": UnmappedValues },
    },
  ],
  "output": [
    {
      "name": "data",
      "type": "datatable",
      "description": "A datatable containing mapped values in `new column`.",
    },
  ],
};
