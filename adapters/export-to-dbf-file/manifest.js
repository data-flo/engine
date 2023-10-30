module.exports = {
  "description": "Exports a datatable as a dBase database file (https://en.wikipedia.org/wiki/.dbf).",
  "group": "Export",
  "subgroup": "Data Destinations",
  "input": [
    {
      "name": "data",
      "type": "datatable",
      "description": "Data to be imported.",
    },
    {
      "name": "column types",
      "type": "map",
      "description": "A map of column name to data type.",
    },
    {
      "name": "output file name",
      "type": "text",
      "description": "The name of the file to create.\nIf unspecified, defaults to `file.dbf`.",
      "default": "file.dbf",
    },
  ],
  "output": [
    {
      "name": "dbf",
      "type": "file",
      "description": "Exported file DBF format",
    },
  ],
};
