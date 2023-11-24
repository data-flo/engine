const { DateFormats, DurationUnits } = require("../../enums");

module.exports = {
  "description": "Calculates the time difference (in a specified unit of measurement) between two datatable columns (column one - column two).",
  "group": "Transform",
  "subgroup": "Data Manipulation",
  "input": [
    {
      "name": "data",
      "type": "datatable",
      "description": "The datatable containing two date/time columns.",
      "required": true,
    },
    {
      "name": "column one",
      "type": "text",
      "description": "The name of the column containing reference date/time values.",
      "required": true,
      "ui": { "column-in": "data" },
    },
    {
      "name": "column one format",
      "type": "text",
      "description": "The format of data in column one based on Unicode Technical Standard #35: https://date-fns.org/v2.0.1/docs/parse#:~:text=Accepted%20format%20string%20patterns%3A.\nIf unspecified, defaults to ISO 8601 date/time.",
      "required": false,
      "default": "yyyy-MM-dd'T'HH:mm:ssxxx",
      "ui": { "can-be-one-of": DateFormats },
    },
    {
      "name": "column two",
      "type": "text",
      "description": "The name of the column containing date/time values.",
      "required": true,
      "ui": { "column-in": "data" },
    },
    {
      "name": "column two format",
      "type": "text",
      "description": "The format of data in value column based on Unicode Technical Standard #35: https://date-fns.org/v2.0.1/docs/parse#:~:text=Accepted%20format%20string%20patterns%3A.\nIf unspecified, defaults to ISO 8601 date/time.",
      "required": false,
      "default": "yyyy-MM-dd'T'HH:mm:ssxxx",
      "ui": { "can-be-one-of": DateFormats },
    },
    {
      "name": "difference column",
      "type": "text",
      "description": "The name of the new column containing time difference values.\nIf unspecified, defaults to `difference`.",
      "required": false,
      "default": "difference",
    },
    {
      "name": "difference unit",
      "type": "text",
      "description": "The unit of time measurement.\nPossible values are `years`, `quarter`, `months`, `weeks`, `days`, `hours`, `minutes`, `seconds`, or `milliseconds`.\nIf unspecified, defaults to `days`.",
      "required": false,
      "default": "days",
      "ui": { "must-be-one-of": DurationUnits },
    },
  ],
  "output": [
    {
      "name": "data",
      "type": "datatable",
      "description": "A datatable with the new column added.",
    },
  ],
  "keywords": [

  ],
};
