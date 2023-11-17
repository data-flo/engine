module.exports = {
  "description": "Exports a datatable as a dBase database file (https://en.wikipedia.org/wiki/.dbf).",
  "group": "Export",
  "subgroup": "Data Destinations",
  "input": [
    {
      "name": "data",
      "type": "datatable",
      "description": "Data to be imported.",
      "required": true,
    },
    {
      "name": "column types",
      "type": "dictionary",
      "description": "A dictionary of column name with data type.",
      "required": true,
    },
    {
      "name": "output file name",
      "type": "text",
      "description": "The name of the file to create.\nIf unspecified, defaults to `file.dbf`.",
      "required": false,
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
