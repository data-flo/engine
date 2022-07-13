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
      "name": "column name",
      "type": "text",
      "description": "The name of the column containing the date/time values.",
      "required": true,
      "ui": { "column-in": "data" },
    },
    {
      "name": "original format",
      "type": "text",
      "description": "The format tokens, of the original values, based on Unicode Technical Standard #35.\nSee: https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table.\nDefaults to `ISO 8601`.",
      "default": "ISO 8601",
      "required": false,
    },
    {
      "name": "original locale",
      "type": "text",
      "description": "The language locale to be used when parsing the original values.\nSee https://date-fns.org/v2.0.1/docs/I18n#supported-languages for a list of supported languages.\nIf unspecified, `locale` defaults to `en-GB`.",
      "required": false,
      "default": "en-GB",
    },
    {
      "name": "new format",
      "type": "text",
      "description": "The format tokens, of the new values, based on Unicode Technical Standard #35.\nSee: https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table.\nDefaults to `yy-MM-dd`.",
      "required": false,
      "default": "yy-MM-dd",
    },
    {
      "name": "new locale",
      "type": "text",
      "description": "The language locale to be used when formatting the new values.\nSee https://date-fns.org/v2.0.1/docs/I18n#supported-languages for a list of supported languages.\nIf unspecified, `locale` defaults to `en-GB`.",
      "required": false,
      "default": "en-GB",
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
