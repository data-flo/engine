module.exports = {
  "description": "Reads a datatable from a SQLite DB file.",
  "group": "Transformations",
  "subgroup": "Data Destinations",
  "input": [
    {
      "name": "sqlite",
      "type": "file",
      "description": "The SQLite DB file from which the data will be imported."
    },
    {
      "name": "query",
      "type": "text",
      "description": "The query to be passed to the database."
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