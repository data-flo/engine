const { Operators } = require("../../enums.js");

module.exports = {
  "description": "Performs a mathematical calculation on two datatable columns.",
  "group": "Transform",
  "subgroup": "Data Tables",
  "input": [
    {
      "name": "data",
      "type": "datatable",
      "description": "The datatable containing the column to be formatted.",
      "required": true,
    },
    {
      "name": "left column",
      "type": "text",
      "description": "The name of the column containing the values on the left-hand side of the operator.",
      "required": true,
      "ui": { "column-in": "data" },
    },
    {
      "name": "right column",
      "type": "text",
      "description": "The name of the column containing the values on the right-hand side of the operator.",
      "required": true,
      "ui": { "column-in": "data" },
    },
    {
      "name": "operation",
      "type": "text",
      "description": "The calculate operation to be used.\n Can be either `add`, `subtract`, `multiply`, `divide`, `percent`, or `exponent`.\nIf unspecified, defaults to `add`.",
      "required": false,
      "default": "add",
      "ui": { "can-be-one-of": Operators },
    },
    {
      "name": "result column",
      "type": "text",
      "description": "The name of the column to which the calculated values will be added.",
      "required": false,
      "ui": { "column-not-in": "data" },
    },
    {
      "name": "result unit",
      "type": "text",
      "description": "An optional unit to be appended to the result.\nIf unspecified, defaults to blank.",
      "required": false,
      "default": "",
    },
  ],
  "output": [
    {
      "name": "data",
      "type": "datatable",
      "description": "A datatable with formatted values.",
    },
  ],
};
