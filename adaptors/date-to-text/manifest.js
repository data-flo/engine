
module.exports = {
  "description": "Formats a date value as a text.",
  "group": "Transformations",
  "subgroup": "Text Manipulation",
  "input": [
    {
      "name": "value",
      "type": "date",
      "description": "The input date/time value.\nIf unspecified, the current date/time will be used.",
      "default": null
    },
    {
      "name": "format",
      "type": "text",
      "description": "Format tokens based on Unicode Technical Standard #35.\nSee: https://momentjs.com/docs/#/displaying/format/.\nDefaults to `ISO 8601`.",
      "default": ""
    },
    {
      "name": "locale",
      "type": "text",
      "description": "A language locale to be used when formatting the values.\nSee https://github.com/moment/moment/tree/develop/locale.\nIf unspecified, it defaults to `en-GB`.",
      "default": "en-GB"
    }
  ],
  "output": [
    {
      "name": "text",
      "type": "text",
      "description": "The date as a formatted text."
    }
  ]
}