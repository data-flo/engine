const { DateFormats, LanguageLocales } = require("../../enums");

module.exports = {
  "description": "Converts a date/time value to text in a specified format.",
  "group": "Transform",
  "subgroup": "Text Manipulation",
  "input": [
    {
      "name": "value",
      "type": "text",
      "description": "The input date/time value.\nIf unspecified, the current date/time will be used.",
      "required": false,
    },
    {
      "name": "format",
      "type": "text",
      "description": "The format of data in column one based on Unicode Technical Standard #35: https://date-fns.org/v2.30.0/docs/parse#:~:text=Accepted%20format%20string%20patterns%3A.\nIf unspecified, defaults to ISO 8601 date/time.",
      "required": false,
      "default": "yyyy-MM-dd'T'HH:mm:ssxxx",
      "ui": { "can-be-one-of": DateFormats },
    },
    {
      "name": "locale",
      "type": "text",
      "description": "A language locale to be used when formatting the values.\nSee https://date-fns.org/v2.28.0/docs/Locale.\nIf unspecified, it defaults to `en-US`.",
      "required": false,
      "default": "en-US",
      "ui": { "must-be-one-of": LanguageLocales },
    },
    {
      "name": "timezone",
      "type": "text",
      "description": "The three letter code of the timezone (e.g. UTC).",
      "required": false,
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
