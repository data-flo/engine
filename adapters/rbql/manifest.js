module.exports = {
  "description": "Runs a RBQL (Rainbow Query Language) on a datatable.",
  "group": "Transform",
  "subgroup": "Data Manipulation",
  "input": [
    {
      "name": "data",
      "type": "datatable",
      "description": "The datatable to be aggregated.",
      "required": true,
    },
    {
      "name": "query",
      "type": "text",
      "description": "A query in RBQL (https://rbql.org/).",
      "required": true,
    },
  ],
  "output": [
    {
      "name": "data",
      "type": "datatable",
      "description": "A datatable with aggregated data.",
    },
  ],
};
