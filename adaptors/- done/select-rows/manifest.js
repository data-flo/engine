module.exports = {
  "description": "Selects rows, based on position, from a datatable.",
  "group": "Transformations",
  "subgroup": "Data Tables",
  "input": [
    {
      "name": "data",
      "type": "datatable",
      "description": "The datatable containing the rows to be selected.",
    },
    {
      "name": "begin",
      "type": "number",
      "description": "The position of the first row to be selected.\nA negative number can be used to count from the end of the datatable (e.g. `-5` would start at the fifth-to-last row).\nIf unspecified, defaults to `1` (first row of data).",
      "default": 1,
    },
    {
      "name": "end",
      "type": "number",
      "description": "The position of the last row to be selected.\nA negative number can be used to count from the end of the datatable.\nIf unspecified, defaults to `-1` (last row of data).",
      "default": -1,
    },
    {
      "name": "limit",
      "type": "number",
      "description": "A positive number specifying a limit on the number of rows to be selected.\nIf unspecified, no limit will be applied.",
      "default": null,
    },
  ],
  "output": [
    {
      "name": "data",
      "type": "datatable",
      "description": "A datatable containing the selected rows.",
    },
  ],
};
