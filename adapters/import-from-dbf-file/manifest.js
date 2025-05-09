module.exports = {
  "description": "Reads data from a dBASE (`.dbf`) file.",
  "group": "Import",
  "subgroup": "Data Sources",
  "input": [
    {
      "name": "dbf",
      "type": "file",
      "description": "A dBASE (`.dbf`) file.",
      "required": true,
    },
  ],
  "output": [
    {
      "name": "data",
      "type": "datatable",
      "description": "Data read from the file.",
    },
  ],
};
