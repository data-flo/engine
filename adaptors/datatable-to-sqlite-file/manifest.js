module.exports = {
  "description": "Writes a datatable to a SQLite DB file.",
  "group": "Transformations",
  "subgroup": "Data Destinations",
  "input": [
    {
      "name": "sqlite",
      "type": "file",
      "description": "The SQLite DB file to which the data to will exported."
    },
    {
      "name": "table name",
      "type": "text",
      "description": "The name of an existing table in the SQLite file to which the data to will exported."
    },
    {
      "name": "id column name",
      "type": "text",
      "description": "The name of column which contains unique row IDs.",
      "default": null
    },
    {
      "name": "data",
      "type": "datatable",
      "description": "Data to be exported."
    }
  ],
  "output": [
    {
      "name": "sqlite",
      "type": "file",
      "description": "A file in SQLite format with the data to exported."
    },
    {
      "name": "ids",
      "type": "list",
      "description": "A list of created and updated row IDs."
    },
    {
      "name": "created ids",
      "type": "list",
      "description": "A list of created row IDs."
    },
    {
      "name": "updated ids",
      "type": "list",
      "description": "A list of updated row IDs."
    }
  ]
}