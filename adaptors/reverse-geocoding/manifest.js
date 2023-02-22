export default {
  "description": "Converts latitude & longitude in datatable columns to location names.",
  "group": "Transformations",
  "subgroup": "Data Tables",
  "input": [
    {
      "name": "data",
      "type": "datatable",
      "description": "The datatable containing the latitude & longitude columns to be converted.",
      "required": true,
    },

    {
      "name": "latitude column",
      "type": "text",
      "default": "latitude",
      "description": "The name of the column containing latitude values (in decimal degrees).\nA number preceded by a sign character. A plus sign (+) denotes northern hemisphere, and a minus sign (-) denotes southern hemisphere.\nIf unspecified, defaults to `latitude`.",
      "required": true,
    },
    {
      "name": "longitude column",
      "type": "text",
      "default": "longitude",
      "description": "The name of the column containing longitude values (in decimal degrees).\nA plus sign (+) denotes east longitude, and a minus sign (-) denotes west longitude.\nIf unspecified, defaults to `longitude`.",
      "required": true,
    },

    {
      "name": "location column",
      "type": "text",
      "description": "The name of the column to contain location output.",
      "required": true,
    },
    {
      "name": "location type",
      "type": "text",
      "description": "The type of the geographic feature. Valid options are \"country\", \"region\", \"postcode\", \"district\", \"place\", \"locality\", \"neighborhood\", \"address\", and \"poi\". Defaults to \"country\".",
      "default": "country",
      "required": true,
    },

    {
      "name": "api provider",
      "type": "text",
      "description": "OpenCage or Mapbox",
      "required": false,
    },
    {
      "name": "api key",
      "type": "text",
      "description": "An OpenCage Geocoding API key (https://opencagedata.com/api) or a Mapbox API key (https://docs.mapbox.com/help/getting-started/access-tokens/).",
      "required": true,
    },
  ],
  "output": [
    {
      "name": "data",
      "type": "datatable",
      "description": "An object containing columns and rows.",
    },
  ],
};
