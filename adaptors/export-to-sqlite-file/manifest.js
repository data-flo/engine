module.exports = {
  "description": "Exports a datatable to a SQLite DB file.",
  "group": "Transformations",
  "subgroup": "Data Destinations",
  "input": [
    {
      "name": "data",
      "type": "datatable",
      "description": "The datatable to be exported.",
    },
    {
      "name": "table name",
      "type": "text",
      "description": "The name of the SQLite table to which the data will be exported.",
    },
    {
      "name": "id column name",
      "type": "text",
      "description": "The name of the column which contains unique row IDs.",
      "default": null,
    },
  ],
  "output": [
    {
      "name": "sqlite",
      "type": "file",
      "description": "A file in SQLite format with the exported data.",
    },
  ],
};
