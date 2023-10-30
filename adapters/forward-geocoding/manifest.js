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

    {
      "name": "search area",
      "type": "text",
      "description": "Restricts the search to the user-specified country/countries provided as comma-separated [ISO 3166-1 alpha-3](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3) country codes. For example: `CAN,MEX,USA`.",
      "required": false,
    },

    {
      "name": "decimal places",
      "type": "number",
      "description": "The number of digits to appear after the decimal point; should be a value between 0 and 6, inclusive.\nIf unspecified, it defaults to 6.",
      "required": false,
      "default": 6,
    },

    {
      "name": "place type column",
      "type": "text",
      "description": "The column name for the place type result (either `building`, `road`, `hamlet`, `village`, `neighbourhood`, `city`, `county`, `postcode`, `partial_postcode`, `terminated_postcode`, `postal_city`, `state_district`, `state`, `region`, `island`, `body_of_water`, `country`, `continent`, `fictitious`, or `unknown`).\nIf unspecified, the type column will not be added.",
      "required": false,
    },

    // {
    //   "name": "api provider",
    //   "type": "text",
    //   "description": "An OpenCage Geocoding API key (https://opencagedata.com/api).",
    //   "required": true,
    // },
    // {
    //   "name": "api key",
    //   "type": "text",
    //   "description": "A valid HERE API Key (https://developer.here.com/documentation/identity-access-management/dev_guide/topics/plat-using-apikeys.html).",
    //   "required": true,
    // },
  ],
  "output": [
    {
      "name": "data",
      "type": "datatable",
      "description": "A datatable with the latitude & longitude values added.",
    },
  ],
};
