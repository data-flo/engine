module.exports = {
  "description": "Adds random jittering to specified numeric columns in a datatable.",
  "group": "Transformations",
  "subgroup": "Data Tables",
  "input": [
    {
      "name": "data",
      "type": "datatable",
      "description": "The datatable containing the columns to be jittered.",
      "required": true,
    },
    {
      "name": "columns",
      "type": "list",
      "description": "The names of the columns to which jittering will be added.",
      "required": true,
      "ui": { "column-in": "data" },
    },
    {
      "name": "range",
      "type": "number",
      "description": "The maximum distance from the original value.",
      "required": false,
      "default": 1,
    },
    {
      "name": "unit",
      "type": "text",
      "description": "The unit of the range value. For jittering geographical coordinates use either `kilometers`, `miles`.",
      "required": false,
      "default": "none",
      "ui": { "must-be-one-of": [ "kilometers", "miles", "none" ] },
    },
    {
      "name": "digits",
      "type": "number",
      "description": "The number of digits to appear after the decimal point; should be a value between 0 and 100, inclusive. If this argument is omitted, it is treated as 6.",
      "required": false,
      "default": 6,
    },
  ],
  "output": [
    {
      "name": "data",
      "type": "datatable",
      "description": "A datatable with jittered values in the specified columns.",
    },
  ],
};
