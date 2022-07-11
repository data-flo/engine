module.exports = {
  "description": "Reads data from a dBASE (`.dbf`) file.",
  "group": "Transformations",
  "subgroup": "Data Sources",
  "input": [
    {
      "name": "dbf",
      "type": "file",
      "description": "A dBASE (`.dbf`) file."
    }
  ],
  "output": [
    {
      "name": "data",
      "type": "datatable",
      "description": "Data read from the file."
    }
  ]
}
