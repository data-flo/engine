module.exports = {
  "description": "Splits geographical coordinates in a datatable column to a latitude & a longitude columns.",
  "group": "Transformations",
  "subgroup": "Data Tables",
  "input": [
    {
      "name": "data",
      "type": "datatable",
      "description": "The datatable containing the column to be processed.",
      "required": true,
    },
    {
      "name": "coordinates column",
      "type": "text",
      "description": "The name of the column containing geographical coordinates.",
      "required": true,
      "ui": { "column-in": "data" },
    },

    {
      "name": "latitude column",
      "type": "text",
      "description": "The column name for the latitude result.\nIf unspecified, defaults to \"latitude\".",
      "required": false,
      "default": "latitude",
    },
    {
      "name": "longitude column",
      "type": "text",
      "description": "The column name for the longitude result.\nIf unspecified, defaults to \"longitude\".",
      "required": false,
      "default": "longitude",
    },

    // {
    //   "name": "digits",
    //   "type": "number",
    //   "description": "The number of digits to appear after the decimal point; should be a value between 0 and 6, inclusive.\nIf unspecified, it defaults to 6.",
    //   "required": false,
    //   "default": 6,
    // },
  ],
  "output": [
    {
      "name": "data",
      "type": "datatable",
      "description": "A datatable with the latitude & longitude values added.",
    },
    {
      "name": "invalid values",
      "type": "list",
      "description": "A list of invalid coordinates.",
    },
  ],
};
