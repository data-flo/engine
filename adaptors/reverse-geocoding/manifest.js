module.exports = {
  "description": "Forward geocode a place into latitude & longitude.",
  "group": "Transformations",
  "subgroup": "Data Tables",
  "input": [
    {
      "name": "mapboxApiKey",
      "type": "text",
      "description": "A Mapbox API key from https://www.mapbox.com/." 
    },
    {
      "name": "data",
      "type": "datatable",
      "description": "An object containing columns and rows."
    },
    {
      "name": "placeType",
      "type": "text",
      "description": "The type of the geographic feature are available in the Mapbox geocoder. Valid options are \"country\", \"region\", \"postcode\", \"district\", \"place\", \"locality\", \"neighborhood\", \"address\", and \"poi\". Defaults to \"country\".",
      "default": "country"
    },
    {
      "name": "longitudeColumn",
      "type": "text",
      "default": "longitude",
      "description": "The source column for the longitude result. Defaults to \"longitude\"."
    },
    {
      "name": "latitudeColumn",
      "type": "text",
      "default": "latitude",
      "description": "The source column for the latitude result. Defaults to \"latitude\"."
    },
    {
      "name": "resultColumn",
      "type": "text",
      "description": "The target column for PlaceType from the query result."
    }
  ],
  "output": [
    {
      "name": "data",
      "type": "datatable",
      "description": "An object containing columns and rows."
    }
  ]
}