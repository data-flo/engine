module.exports = {
  "description": "Connect to and query a SQL Server database and convert the result to a datatable; SELECT statements only.",
  "group": "Transformations",
  "subgroup": "Data Sources",
  "input": [
    {
      "name": "hostname",
      "type": "text",
      "default": "localhost",
      "description": "The name of the database host. Defaults to \"localhost\"."
    },
    {
      "name": "port",
      "type": "integer",
      "default": 1433,
      "description": "The port the database is exposed on. Defaults to 1433."
    },
    {
      "name": "database",
      "type": "text",
      "description": "The database to connect to."
    },
    {
      "name": "username",
      "type": "text",
      "default": "sa",
      "description": "The databases username. Defaults to \"sa\"."
    },
    {
      "name": "password",
      "type": "text",
      "description": "The databases password."
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