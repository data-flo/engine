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
      "name": "placeColumn",
      "type": "text",
      "description": "The source column with the place query."
    },
    {
      "name": "longitudeColumn",
      "type": "text",
      "default": "longitude",
      "description": "The target column for the longitude result. Defaults to \"longitude\"."
    },
    {
      "name": "latitudeColumn",
      "type": "text",
      "default": "latitude",
      "description": "The target column for the latitude result. Defaults to \"latitude\"."
    },
    {
      "name": "typeColumn",
      "type": "text",
      "default": "type",
      "description": "The name of the column to hold the place type. Defaults to \"type\"."
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