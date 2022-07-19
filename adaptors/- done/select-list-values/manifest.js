module.exports = {
  "description": "Selects values, based on position, from a list.",
  "group": "Transformations",
  "subgroup": "List Manipulation",
  "input": [
    {
      "name": "list",
      "type": "list",
      "description": "The list containing the values to be selected.",
    },
    {
      "name": "begin",
      "type": "number",
      "description": "The position of the first value to be selected.\nA negative number can be used to count from the end of the list (e.g. `-5` would start at the fifth-to-last value).\nIf unspecified, defaults to `1` (first value in list).",
      "default": 1,
    },
    {
      "name": "end",
      "type": "number",
      "description": "The position of the last value to be selected.\nA negative number can be used to count from the end of the list.\nIf unspecified, defaults to `-1` (last value in list).",
      "default": -1,
    },
    {
      "name": "limit",
      "type": "number",
      "description": "A positive number specifying a limit on the number of values to be selected.\nIf unspecified, no limit will be applied.",
      "default": null,
    },
  ],
  "output": [
    {
      "name": "list",
      "type": "list",
      "description": "A list containing the selected values.",
    },
  ],
};
