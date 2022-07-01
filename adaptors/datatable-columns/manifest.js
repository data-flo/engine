module.exports = {
  "description": "Converts a datatable to a list of said datatables columns.",
  "group": "Transformations",
  "subgroup": "Data Tables",
  "input": [
    {
      "name": "data",
      "type": "datatable",
      "description": "An object containing columns and rows."
    }
  ],
  "output": [
    {
      "name": "columns",
      "type": "list",
      "description": "An array if items." 
    }
  ]
}