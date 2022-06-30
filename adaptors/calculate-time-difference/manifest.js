module.exports = {
  "description": "Calculates the time difference (in a specified unit of measurement) between two datatable columns.",
  "category": "Data Manipulation",
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
      "values": [
        [ "yyyy-MM-dd'T'HH:mm:ssxxx", "ISO 8601 date and time in UTC (e.g. 2022-06-30T16:20:34+00:00)" ],
        [ "yyyy-MM-dd", "ISO 8601 date (e.g. 2022-06-30)" ],
        [ "dd/MM/yyyy", "date/month/year (e.g. 30/06/2022)" ],
        [ "MM/dd/yyyy", "month/date/year (e.g. 06/30/2022)" ],
        [ "yyyy/MM/dd", "year/month/date (e.g. 06/30/2022)" ],
        [ "dd.MM.yyyy", "date.month.year (e.g. 30.06.2022)" ],
      ],
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
      "values": [
        [ "yyyy-MM-dd'T'HH:mm:ssxxx", "ISO 8601 date and time in UTC (e.g. 2022-06-30T16:20:34+00:00)" ],
        [ "yyyy-MM-dd", "ISO 8601 date (e.g. 2022-06-30)" ],
        [ "dd/MM/yyyy", "date/month/year (e.g. 30/06/2022)" ],
        [ "MM/dd/yyyy", "month/date/year (e.g. 06/30/2022)" ],
        [ "yyyy/MM/dd", "year/month/date (e.g. 06/30/2022)" ],
        [ "dd.MM.yyyy", "date.month.year (e.g. 30.06.2022)" ],
      ],
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
