module.exports = {
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
      "required": false,
      "defaut": "latitude",
      "ui": { "column-in": "data" },
    },
    {
      "name": "longitude column",
      "type": "text",
      "default": "longitude",
      "description": "The name of the column containing longitude values (in decimal degrees).\nA plus sign (+) denotes east longitude, and a minus sign (-) denotes west longitude.\nIf unspecified, defaults to `longitude`.",
      "required": false,
      "defaut": "longitude",
      "ui": { "column-in": "data" },
    },

    {
      "name": "location type",
      "type": "text",
      "description": "The type of the geographic feature. Valid options are `address`, `position`, `country code`, `country name`, `ISO-3166-1-alpha-2`, `ISO-3166-1-alpha-3`, `ISO-3166-2`, `postcode`, `state name`, `state code`, `county`, `city`, or `continent`.\nDefaults to `address`.",
      "required": false,
      "default": "country code",
      "ui": {
        "must-be-one-of": [
          [ "type" ],
          [ "address" ],
          [ "position" ],
          [ "country code" ],
          [ "country name" ],
          [ "ISO-3166-1-alpha-2" ],
          [ "ISO-3166-1-alpha-3" ],
          [ "ISO-3166-2" ],
          [ "postcode" ],
          [ "state name" ],
          [ "state code" ],
          [ "county" ],
          [ "city" ],
          [ "continent" ],
        ],
      },
    },

    {
      "name": "location column",
      "type": "text",
      "description": "The name of the column to contain location output.",
      "required": true,
    },

    // {
    //   "name": "api provider",
    //   "type": "text",
    //   "description": "OpenCage or Mapbox",
    //   "required": false,
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
      "description": "An object containing columns and rows.",
    },
  ],
};
