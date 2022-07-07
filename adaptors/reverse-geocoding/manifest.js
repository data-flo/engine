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
      "name": "longitude column",
      "type": "text",
      "default": "longitude",
      "description": "The source column for the longitude result. Defaults to \"longitude\".",
      "required": true,
    },
    {
      "name": "latitude column",
      "type": "text",
      "default": "latitude",
      "description": "The source column for the latitude result. Defaults to \"latitude\".",
      "required": true,
    },

    {
      "name": "feature type",
      "type": "text",
      "description": "The type of the geographic feature are available in the Mapbox geocoder. Valid options are \"country\", \"region\", \"postcode\", \"district\", \"place\", \"locality\", \"neighborhood\", \"address\", and \"poi\". Defaults to \"country\".",
      "default": "country",
      "required": true,
    },
    {
      "name": "feature column",
      "type": "text",
      "description": "The target column for PlaceType from the query result.",
      "required": true,
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
