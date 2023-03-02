module.exports = {
  "description": "Converts location names in a datatable column to latitude & longitude.",
  "group": "Transformations",
  "subgroup": "Data Tables",
  "input": [
    {
      "name": "data",
      "type": "datatable",
      "description": "The datatable containing the column to be converted.",
      "required": true,
    },
    {
      "name": "location column",
      "type": "text",
      "description": "The name of the column containing location names.",
      "required": true,
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
    {
      "name": "type column",
      "type": "text",
      "description": "The name of the column to hold the place type.\nIf unspecified, the type column will not be added.",
      "required": false,
    },

    // {
    //   "name": "api provider",
    //   "type": "text",
    //   "description": "An OpenCage Geocoding API key (https://opencagedata.com/api).",
    //   "required": true,
    // },
    {
      "name": "api key",
      "type": "text",
      "description": "An OpenCage Geocoding API key (https://opencagedata.com/api).",
      "required": true,
    },
  ],
  "output": [
    {
      "name": "data",
      "type": "datatable",
      "description": "A datatable with the latitude & longitude values added.",
    },
  ],
};
