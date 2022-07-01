const { DateFormats, DurationUnits } = require("../../enums");

module.exports = {
  "description": "Calculates the time difference (in a specified unit of measurement) between two datatable columns.",
  "group": "Transformations",
  "subgroup": "Data Manipulation",
  "input": [
    {
      "name": "data",
      "type": "datatable",
      "description": "A datatable.",
    },
    {
      "name": "reference column",
      "type": "text",
      "description": "The name of the column containing reference date/time values.",
    },
    {
      "name": "reference format",
      "type": "text",
      "description": "The format of data in reference column based on Unicode Technical Standard #35: https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table.\nDefaults to ISO 8601 date and time in UTC.",
      "required": false,
      "default": "yyyy-MM-dd'T'HH:mm:ssxxx",
      "values": DateFormats,
    },
    {
      "name": "value column",
      "type": "text",
      "description": "The name of the column containing date/time values.",
    },
    {
      "name": "value format",
      "type": "text",
      "description": "The format of data in value column based on Unicode Technical Standard #35: https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table.\nDefaults to ISO 8601 date and time in UTC.",
      "required": false,
      "default": "yyyy-MM-dd'T'HH:mm:ssxxx",
      "values": DateFormats,
    },
    {
      "name": "target column",
      "type": "text",
      "description": "The name of the column to which time difference values will be added.",
    },
    {
      "name": "difference unit",
      "type": "text",
      "description": "The unit of time difference measurement.\nThe supported measurements are `years`, `quarter`, `months`, `weeks`, `days`, `hours`, `minutes`, `seconds`, or `milliseconds`",
      "values": DurationUnits,
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
