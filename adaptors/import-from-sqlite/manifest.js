module.exports = {
  "description": "Imports data from a SQLite file.",
  "group": "Transformations",
  "subgroup": "Data Sources",
  "input": [
    {
      "name": "sqlite file",
      "type": "file",
      "description": "The SQLite file from which the data will be imported.",
      "required": true,
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
