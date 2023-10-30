module.exports = {
  "description": "Imports data from a Microsoft SQl Server database.",
  "group": "Import",
  "subgroup": "Data Sources",
  "input": [
    {
      "name": "hostname",
      "type": "text",
      "description": "The hostname (.e.g `localhost`) or the IP address (e.g. `127.0.0.1`) of the database server.",
      "required": true,
    },
    {
      "name": "port",
      "type": "number",
      "description": "The port of the database server.\nIf unspecified, defaults to `1433`.",
      "required": false,
      "default": 1433,
      "ui": { "integer": true },
    },
    {
      "name": "database",
      "type": "text",
      "description": "The name of the database.",
      "required": true,
    },
    {
      "name": "username",
      "type": "text",
      "description": "The username to connect to the database.",
      "required": false,
    },
    {
      "name": "password",
      "type": "text",
      "description": "The password to connect to the database.",
      "required": false,
    },
    {
      "name": "query",
      "type": "text",
      "description": "The SQL query reading from the database (e.g. `SELECT * from table WHERE ...`).",
      "required": true,
    },
  ],
  "output": [
    {
      "name": "data",
      "type": "datatable",
      "description": "A datatable containing the imported data.",
    },
  ],
};
