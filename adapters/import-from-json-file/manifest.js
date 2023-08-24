module.exports = {
  "description": "Imports data from a file in JSON format.",
  "group": "Transformations",
  "subgroup": "Data Sources",
  "input": [
    {
      "name": "json",
      "type": "file",
      "description": "A file in JSON format.",
      "required": true,
    },
    {
      "name": "filter",
      "type": "text",
      "description": "An optional JQ (https://jqlang.github.io/jq/) filter.",
      "required": false,
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
