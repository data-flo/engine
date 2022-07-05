const { DateFormats, DurationUnits } = require("../../enums");

module.exports = {
  "description": "Calculates the time difference (in a specified unit of measurement) between two datatable columns (column one - column two).",
  "group": "Transformations",
  "subgroup": "Data Manipulation",
  "input": [
    {
      "name": "data",
      "type": "datatable",
      "description": "The datatable containing two date/time columns.",
    },
    {
      "name": "column one",
      "type": "text",
      "description": "The name of the column containing reference date/time values.",
    },
    {
      "name": "column one format",
      "type": "text",
      "description": "The format of data in column one based on Unicode Technical Standard #35: https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table.\nDefaults to ISO 8601 date and time in UTC.",
      "required": false,
      "default": "yyyy-MM-dd'T'HH:mm:ssxxx",
      "values": DateFormats,
    },
    {
      "name": "column two",
      "type": "text",
      "description": "The name of the column containing date/time values.",
    },
    {
      "name": "column two format",
      "type": "text",
      "description": "The format of data in value column based on Unicode Technical Standard #35: https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table.\nDefaults to ISO 8601 date and time in UTC.",
      "required": false,
      "default": "yyyy-MM-dd'T'HH:mm:ssxxx",
      "values": DateFormats,
    },
    {
      "name": "difference column",
      "type": "text",
      "description": "The name of the new column containing time difference values.",
      "required": true,
    },
    {
      "name": "difference unit",
      "type": "text",
      "description": "The unit of time measurement.\nThe supported measurements are `years`, `quarters`, `months`, `weeks`, `days`, `hours`, `minutes`, `seconds`, or `milliseconds`",
      "values": DurationUnits,
    },
  ],
  "output": [
    {
      "name": "data",
      "type": "datatable",
      "description": "A datatable the new column added.",
    },
  ],
  "keywords": [

  ],
};
