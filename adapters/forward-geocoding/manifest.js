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
      "name": "geographic area",
      "type": "text",
      "description": "Search within a geographic area. This is a hard filter. Results will be returned if they are located within the specified area. A geographic area can be a country (or multiple countries), provided as comma-separated [ISO 3166-1 alpha-3](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3) country codes in all uppercase. For example, CAN,MEX,USA.",
      "required": false,
    },

    {
      "name": "type column",
      "type": "text",
      "description": "The name of the column to hold the match type (either `city`, `country`, `county`, `district`, `houseNumber`, `intersection`, `place`, `postalCode`, `state`, `street`, or `subdistrict`).\nIf unspecified, the type column will not be added.",
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
      "description": "A valid HERE API Key (https://developer.here.com/documentation/identity-access-management/dev_guide/topics/plat-using-apikeys.html).",
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