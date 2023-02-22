import { AggregateMethods }  from "../../enums";

export default {
  "description": "Aggregates values in specified columns grouped by rows.",
  "group": "Transformations",
  "subgroup": "Data Manipulation",
  "input": [
    {
      "name": "data",
      "type": "datatable",
      "description": "The datatable to be aggregated.",
      "required": true,
    },
    {
      "name": "group column names",
      "type": "list",
      "description": "The names of the columns containing values to be grouped.",
      "required": true,
      "ui": { "column-in": "data" },
    },
    {
      "name": "aggregations",
      "type": "map",
      "description": "A map of column names with aggregation method, where the keys are the column names, and the values should be either `max`, `mean`, `median`, `min`, `mode`, `sum`, `unique` (distinct).",
      "required": true,
      "ui": {
        "keys": { "column-in": "data" },
        "values": { "must-be-one-of": AggregateMethods },
      },
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
