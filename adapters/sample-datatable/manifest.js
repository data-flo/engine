const { SamplingStretegies } = require("../../enums.js");

module.exports = {
  "description": "Samples rows in a datatable.",
  "group": "Transform",
  "subgroup": "Data Tables",
  "input": [
    {
      "name": "data",
      "type": "datatable",
      "description": "The datatable to be sampled.",
      "required": true,
    },
    {
      "name": "sampling method",
      "type": "text",
      "description": "The sampling method to be used. Valid values are `first`, `random`, or `last`.\nIf unspecified, defaults to `first`",
      "required": false,
      "default": "first",
      "ui": { "must-be-one-of": SamplingStretegies },
    },
    {
      "name": "sample size",
      "type": "text",
      "description": "The number of rows to be included in the sample.\nIf unspecified, defaults to `100`",
      "required": false,
      "default": "100",
    },
  ],
  "output": [
    {
      "name": "sample data",
      "type": "datatable",
      "description": "A datatable with the sampled rows.",
    },
    // {
    //   "name": "sample size",
    //   "type": "number",
    //   "description": "The number of rows included in the sample.",
    // },
  ],
};
