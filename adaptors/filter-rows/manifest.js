module.exports = {
  "description": "Finds rows in a datatable that match a search pattern.",
  "group": "Transformations",
  "subgroup": "Data Tables",
  "input": [
    {
      "name": "data",
      "type": "datatable",
      "description": "A datatable to be searched.",
    },
    {
      "name": "column names",
      "type": "list",
      "description": "The names of columns in the datatable to be searched.",
    },
    {
      "name": "pattern",
      "type": "text",
      "description": "A text or a regular expression to be searched for within the datatable columns.",
    },
  ],
  "output": [
    {
      "name": "data",
      "type": "datatable",
      "description": "A datatable with the rows that match the testing pattern.",
    },
    {
      "name": "complementary",
      "type": "datatable",
      "description": "A datatable with the rows that do not match the testing pattern.",
    },
  ],
};
