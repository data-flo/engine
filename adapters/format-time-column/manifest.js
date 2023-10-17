const { DurationUnits } = require("../../enums.js");

module.exports = {
  "description": "Formats date/time values in a datatable column.",
  "group": "Transformations",
  "subgroup": "Data Tables",
  "input": [
    {
      "name": "data",
      "type": "datatable",
      "description": "The datatable containing the column to be formatted.",
      "required": true,
    },
    {
      "name": "original column",
      "type": "text",
      "description": "The name of the column containing the date/time values.",
      "required": true,
      "ui": { "column-in": "data" },
    },
    {
      "name": "original unit",
      "type": "text",
      "description": "The unit of time measurement of the original values.\nIf unspecified, defaults to `milliseconds`.",
      "required": false,
      "default": "milliseconds",
      "ui": { "can-be-one-of": DurationUnits },
    },
    {
      "name": "new unit",
      "type": "text",
      "description": "The unit of time measurement of the new values.\nIf unspecified, defaults to `minutes`.",
      "required": false,
      "default": "minutes",
      "ui": { "can-be-one-of": DurationUnits },
    },
    {
      "name": "new column",
      "type": "text",
      "description": "The name of the column to which the new values will be added.\nIf unspecified, the new values will added to the original column (specified by `original column`), overwriting the original values.",
      "required": false,
      "ui": { "column-not-in": "data" },
    },
  ],
  "output": [
    {
      "name": "data",
      "type": "datatable",
      "description": "A datatable with formatted values.",
    },
  ],
};
