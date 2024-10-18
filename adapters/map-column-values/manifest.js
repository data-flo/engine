const { UnmappedValues } = require("../../enums");

module.exports = {
  "description": "Adds a new column to a datatable by mapping values of an existing column.",
  "group": "Transform",
  "subgroup": "Data Tables",
  "input": [
    {
      "name": "data",
      "type": "datatable",
      "description": "The columns and rows.",
      "required": true,
    },
    {
      "name": "columns",
      "type": "dictionary",
      "description": "A dictionary of existing column names with new columns, where the dictionary keys are the names of existing columns, and the dictionary values are the names of the columns to which the mapped values are written.\nIf a dictionary value is left blank, mapped values are written to the original column.",
      "required": true,
      "ui": {
        "keys": { "column-in": "data" },
      },
    },
    {
      "name": "values",
      "type": "dictionary",
      "description": "The dictionary of existing values with new values, where the dictionary keys are the existing values in original column, and the dictionary values are the corresponding values to be written to new column.\nA dictionary key is treated as a regular expression if it begins and ends with `/` (e.g. `/.*/`).",
      "required": true,
    },
    {
      "name": "case sensitive",
      "type": "boolean",
      "description": "Whether lowercase and uppercase letters should be treated as equivalent.\nIf unspecified, defaults to `False` (lowercase and uppercase letters are treated as equivalent).",
      "required": false,
      "default": false,
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
