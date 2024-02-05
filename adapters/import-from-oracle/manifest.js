module.exports = {
  "description": "Imports data from an Oracle Database and returns the results as a datatable.",
  "group": "Import",
  "subgroup": "Data Sources",
  "input": [
    {
      "name": "connection string",
      "type": "text",
      "description": "An Easy Connect string (e.g. hostname:port/service), a Connect Descriptor string, or the SID of a local Oracle Database instance.",
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
