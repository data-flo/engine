const { DateFormats } = require("../../enums");

module.exports = {
  "description": "Converts a date/time value to text in a specified format.",
  "group": "Transformations",
  "subgroup": "Text Manipulation",
  "input": [
    {
      "name": "value",
      "type": "text",
      "description": "The input date/time value.\nIf unspecified, the current date/time will be used.",
      "default": null,
    },
    {
      "name": "format",
      "type": "text",
      "description": "The format of data in column one based on Unicode Technical Standard #35: https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table. \nDefaults to ISO 8601 date/time.",
      "required": false,
      "default": "yyyy-MM-dd'T'HH:mm:ssxxx",
      "ui": { "can-be-one-of": DateFormats },
    },
    {
      "name": "locale",
      "type": "text",
      "description": "A language locale to be used when formatting the values.\nSee https://date-fns.org/v2.28.0/docs/Locale.\nIf unspecified, it defaults to `en-GB`.",
      "default": "en-GB",
    },
    {
      "name": "timezone",
      "type": "text",
      "description": "The three letter code of the timezone (e.g. UTC).",
      "default": "UTC",
    },
  ],
  "output": [
    {
      "name": "text",
      "type": "text",
      "description": "The date as a formatted text.",
    },
  ],
};
