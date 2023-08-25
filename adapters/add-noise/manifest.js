module.exports = {
  "description": "Adds random noise to specified latitude/longitude columns in a datatable.",
  "group": "Transformations",
  "subgroup": "Data Tables",
  "input": [
    {
      "name": "data",
      "type": "datatable",
      "description": "The datatable containing the latitude/longitude columns.",
      "required": true,
    },
    {
      "name": "columns",
      "type": "list",
      "description": "The names of the columns to which noise will be added.",
      "required": true,
      "ui": { "column-in": "data" },
    },
    {
      "name": "kms",
      "type": "number",
      "description": "The range in kilometers.",
      "required": false,
      "default": 1,
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
      "description": "A datatable with the new column added.",
    },
  ],
};
