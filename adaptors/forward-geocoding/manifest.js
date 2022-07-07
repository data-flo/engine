module.exports = {
  "description": "Forward geocode a place into latitude & longitude.",
  "group": "Transformations",
  "subgroup": "Data Tables",
  "input": [
    {
      "name": "data",
      "type": "datatable",
      "description": "An object containing columns and rows.",
      "required": true,
    },
    {
      "name": "place column",
      "type": "text",
      "description": "The source column with the place query.",
      "required": true,
    },

    {
      "name": "longitude column",
      "type": "text",
      "description": "The target column for the longitude result.\nIf unspecified, defaults to \"longitude\".",
      "required": false,
      "default": "longitude",
    },
    {
      "name": "latitude column",
      "type": "text",
      "description": "The target column for the latitude result.\nIf unspecified, defaults to \"latitude\".",
      "required": false,
      "default": "latitude",
    },
    {
      "name": "type column",
      "type": "text",
      "description": "The name of the column to hold the place type.\nIf unspecified, defaults to \"type\".",
      "required": false,
      "default": "type",
    },

    {
      "name": "api key",
      "type": "text",
      "description": "A Mapbox API key from https://www.mapbox.com/.",
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
