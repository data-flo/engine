const { DateFormats, LanguageLocales } = require("../../enums");

module.exports = {
  "description": "Formats date/time values in a datatable column.",
  "group": "Transform",
  "subgroup": "Data Tables",
  "input": [
    {
      "name": "data",
      "type": "datatable",
      "description": "The datatable containing the column to be formatted.",
      "required": true,
    },
    {
      "name": "original column name",
      "type": "text",
      "description": "The name of the column containing the date/time values.",
      "required": true,
      "ui": { "column-in": "data" },
    },
    {
      "name": "original format",
      "type": "text",
      "description": "The format tokens, of the original values, based on Unicode Technical Standard #35.\nSee: https://date-fns.org/v2.0.1/docs/parse#:~:text=Accepted%20format%20string%20patterns%3A.\nIf unspecified, defaults to ISO 8601 date/time.",
      "required": false,
      "default": "yyyy-MM-dd'T'HH:mm:ssxxx",
      "ui": { "can-be-one-of": DateFormats },
    },
    {
      "name": "original locale",
      "type": "text",
      "description": "The language locale to be used when parsing the original values.\nSee https://date-fns.org/v2.0.1/docs/I18n#supported-languages for a list of supported languages.\nIf unspecified, `locale` defaults to `en-US`.",
      "required": false,
      "default": "en-US",
      "ui": { "must-be-one-of": LanguageLocales },
    },
    {
      "name": "new format",
      "type": "text",
      "description": "The format tokens, of the new values, based on Unicode Technical Standard #35.\nSee: <https://date-fns.org/v2.0.1/docs/parse#:~:text=Accepted%20format%20string%20patterns%3A>.\nIf unspecified, defaults to ISO 8601 date/time.",
      "required": false,
      "default": "yyyy-MM-dd'T'HH:mm:ssxxx",
      "ui": { "can-be-one-of": DateFormats },
    },
    {
      "name": "new locale",
      "type": "text",
      "description": "The language locale to be used when formatting the new values.\nSee https://date-fns.org/v2.0.1/docs/I18n#supported-languages for a list of supported languages.\nIf unspecified, `locale` defaults to `en-US`.",
      "required": false,
      "default": "en-US",
      "ui": { "must-be-one-of": LanguageLocales },
    },
    {
      "name": "new column name",
      "type": "text",
      "description": "The name of the column to which the new values will be added.\nIf unspecified, the new values will added to the original column (specified by `original column name`), overwriting the original values.",
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
