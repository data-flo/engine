module.exports = {
  "description": "Exports a datatable to a SQLite DB file.",
  "group": "Export",
  "subgroup": "Data Destinations",
  "input": [
    {
      "name": "sqlite",
      "type": "file",
      "description": "The SQLite DB file to white data will be exported.",
      "required": true,
    },
    {
      "name": "data",
      "type": "datatable",
      "description": "The datatable to be exported.",
      "required": true,
    },
    {
      "name": "table name",
      "type": "text",
      "description": "The name of the SQLite table to which the data will be exported.",
      "required": true,
    },
    {
      "name": "id column name",
      "type": "text",
      "description": "The name of the column which contains unique row IDs.",
      "required": false,
      "default": null,
    },
    // {
    //   "name": "column types",
    //   "type": "dictionary",
    //   "description": "A dictionary of column name with data type (https://www.sqlite.org/datatype3.html).",
    //   "required": true,
    // },
  ],
  "output": [
    {
      "name": "sqlite",
      "type": "file",
      "description": "A file in SQLite format with the exported data.",
    },
  ],
};
