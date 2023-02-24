module.exports = [
  {
    "identifier": "4NaCFWY92Q2aY1p1bQweqW",
    "manifest": {
      "input": [
        {
          "ui": {
            "x": 80,
            "y": 80,
          },
          "enum": [],
          "required": true,
          "isSecret": false,
          "name": "Metadata ENA",
          "type": "file",
          "description": "",
        },
        {
          "ui": {
            "x": 80,
            "y": 280,
          },
          "enum": [],
          "required": true,
          "isSecret": false,
          "name": "ID's file",
          "type": "file",
          "description": "",
        },
      ],
      "output": [
        // {
        //   "ui": {
        //     "x": 3020,
        //     "y": 290,
        //   },
        //   "argument": "file",
        //   "description": "",
        //   "name": "geocoding-income",
        //   "transformation": "transformation-17",
        //   "type": "file",
        // },
        // {
        //   "ui": {
        //     "x": 2980,
        //     "y": 520,
        //   },
        //   "argument": "csv",
        //   "description": "",
        //   "name": "csv",
        //   "transformation": "transformation-18",
        //   "type": "file",
        // },
      ],
      "transform": [
        {
          "ui": {
            "x": 300,
            "y": 80,
          },
          "binding": [
            {
              "target": "file",
              "type": "input",
              "input": "Metadata ENA",
            },
          ],
          "name": "transformation-1",
          "type": "adaptor",
          "adaptor": "csv-file-to-datatable",
          "description": null,
        },

        // {
        //   "ui": {
        //     "x": 260,
        //     "y": 280,
        //   },
        //   "binding": [
        //     {
        //       "target": "file",
        //       "type": "input",
        //       "input": "ID's file",
        //     },
        //   ],
        //   "name": "transformation-2",
        //   "type": "adaptor",
        //   "adaptor": "file-to-text",
        //   "description": null,
        // },
        // {
        //   "ui": {
        //     "x": 480,
        //     "y": 280,
        //   },
        //   "binding": [
        //     {
        //       "target": "text",
        //       "type": "transformation",
        //       "transformation": "transformation-2",
        //       "argument": "text",
        //     },
        //   ],
        //   "name": "transformation-4",
        //   "type": "adaptor",
        //   "adaptor": "split-text",
        //   "description": null,
        // },
        // {
        //   "ui": {
        //     "x": 670,
        //     "y": 280,
        //   },
        //   "binding": [
        //     {
        //       "target": "list",
        //       "type": "transformation",
        //       "transformation": "transformation-4",
        //       "argument": "subtexts",
        //     },
        //   ],
        //   "name": "transformation-5",
        //   "type": "adaptor",
        //   "adaptor": "list-to-datatable",
        //   "description": null,
        // },

        // {
        //   "ui": {
        //     "x": 480,
        //     "y": 280,
        //   },
        //   "binding": [
        //     {
        //       "target": "file",
        //       "type": "input",
        //       "input": "ID's file",
        //     },
        //   ],
        //   "name": "transformation-4",
        //   "type": "adaptor",
        //   "adaptor": "text-file-to-list",
        //   "description": null,
        // },
        // {
        //   "ui": {
        //     "x": 670,
        //     "y": 280,
        //   },
        //   "binding": [
        //     {
        //       "target": "list",
        //       "type": "transformation",
        //       "transformation": "transformation-4",
        //       "argument": "list",
        //     },
        //   ],
        //   "name": "transformation-5",
        //   "type": "adaptor",
        //   "adaptor": "list-to-datatable",
        //   "description": null,
        // },

        {
          "ui": {
            "x": 670,
            "y": 280,
          },
          "binding": [
            {
              "target": "file",
              "type": "input",
              "input": "ID's file",
            },
            {
              "target": "columns",
              "type": "value",
              "value": [ "value" ],
            },
          ],
          "name": "transformation-5",
          "type": "adaptor",
          "adaptor": "csv-file-to-datatable",
          "description": null,
        },

        {
          "ui": {
            "x": 540,
            "y": 110,
          },
          "binding": [
            {
              "target": "data",
              "type": "transformation",
              "transformation": "transformation-1",
              "argument": "data",
            },
            {
              "target": "columns",
              "type": "value",
              "value": [
                "experiment_accession",
                "run_accession",
                "accession",
                "sample_accession",
                "secondary_sample_accession",
                "instrument_model",
                "read_count",
                "base_count",
                "center_name",
                "fastq_bytes",
                "collected_by",
                "collection_date",
                "country",
                "description",
                "environmental_sample",
                "first_public",
                "isolation_source",
                "location",
                "sub_species",
                "tax_id",
                "scientific_name",
                "sample_alias",
                "center_name",
                "host",
                "host_tax_id",
                "lat",
                "lon",
                "collection_date_submitted",
              ],
            },
          ],
          "name": "transformation-9",
          "type": "adaptor",
          "adaptor": "select-columns",
          "description": null,
        },

        {
          "ui": {
            "x": 920,
            "y": 170,
          },
          "binding": [
            {
              "target": "main column",
              "type": "value",
              "value": "run_accession",
            },
            {
              "target": "main data",
              "type": "transformation",
              "transformation": "transformation-9",
              "argument": "data",
            },
            {
              "target": "other data",
              "type": "transformation",
              "transformation": "transformation-5",
              "argument": "data",
            },
            {
              "target": "other column",
              "type": "value",
              "value": "value",
            },
            {
              "target": "inner join",
              "type": "value",
              "value": true,
            },
          ],
          "name": "transformation-3",
          "type": "adaptor",
          "adaptor": "join-datatables",
          "description": null,
        },

        {
          "ui": {
            "x": 1140,
            "y": 150,
          },
          "name": "transformation-6",
          "type": "adaptor",
          "adaptor": "split-column",
          "description": null,
          "binding": [
            {
              "target": "data",
              "type": "transformation",
              "transformation": "transformation-3",
              "argument": "data",
            },
            {
              "target": "source",
              "type": "value",
              "value": "country",
            },
            {
              "target": "separator",
              "type": "value",
              "value": ":",
            },
            {
              "target": "columns",
              "type": "value",
              "value": [
                "split_country",
                "split_city",
              ],
            },
          ],
        },

        {
          "ui": {
            "x": 1340,
            "y": 160,
          },
          "name": "transformation-7",
          "type": "adaptor",
          "adaptor": "forward-geocoding",
          "description": null,
          "binding": [
            {
              "target": "data",
              "type": "transformation",
              "transformation": "transformation-6",
              "argument": "data",
            },
            {
              "target": "api key",
              "type": "value",
              "value": "a647a72977454694a38b94dba4341ef5",
            },
            {
              "target": "location column",
              "type": "value",
              "value": "split_country",
            },
          ],
        },

        {
          "ui": {
            "x": 1540,
            "y": 190,
          },
          "name": "transformation-8",
          "type": "adaptor",
          "adaptor": "reverse-geocoding",
          "description": null,
          "binding": [
            {
              "target": "data",
              "type": "transformation",
              "transformation": "transformation-7",
              "argument": "data",
            },
            {
              "target": "api key",
              "type": "value",
              "value": "a647a72977454694a38b94dba4341ef5",
            },
            {
              "target": "location column",
              "type": "value",
              "value": "geocoded_country",
            },
            {
              "target": "longitude column",
              "type": "value",
              "value": "longitude",
            },
            {
              "target": "latitude column",
              "type": "value",
              "value": "latitude",
            },
          ],
        },

        {
          "ui": {
            "x": 1750,
            "y": 220,
          },
          "name": "transformation-10",
          "type": "adaptor",
          "adaptor": "remove-columns",
          "description": null,
          "binding": [
            {
              "target": "data",
              "type": "transformation",
              "transformation": "transformation-8",
              "argument": "data",
            },
            {
              "target": "columns",
              "type": "value",
              "value": [
                "country",
                "lat",
                "lon",
                "split_country",
                "split_city",
                "type",
                "host",
              ],
            },
          ],
        },

        {
          "ui": {
            "x": 1960,
            "y": 270,
          },
          "name": "transformation-12",
          "type": "adaptor",
          "adaptor": "extend-datatable",
          "description": null,
          "binding": [
            {
              "target": "data",
              "type": "transformation",
              "transformation": "transformation-10",
              "argument": "data",
            },
            {
              "target": "source",
              "type": "value",
              "value": "host_tax_id",
            },
            {
              "target": "target",
              "type": "value",
              "value": "host",
            },
            {
              "target": "values",
              "type": "value",
              "value": [
                {
                  "key": "9606",
                  "value": "human",
                },
              ],
            },
          ],
        },

        {
          "ui": {
            "x": 2160,
            "y": 310,
          },
          "name": "transformation-11",
          "type": "adaptor",
          "adaptor": "change-column-case",
          "description": null,
          "binding": [
            {
              "target": "data",
              "type": "transformation",
              "transformation": "transformation-12",
              "argument": "data",
            },
            {
              "target": "column",
              "type": "value",
              "value": "isolation_source",
            },
            {
              "target": "case",
              "type": "value",
              "value": "lower",
            },
          ],
        },

        {
          "ui": {
            "x": 1770,
            "y": 420,
          },
          "name": "transformation-15",
          "type": "adaptor",
          "adaptor": "select-columns",
          "description": null,
          "binding": [
            {
              "target": "data",
              "type": "transformation",
              "transformation": "transformation-8",
              "argument": "data",
            },
            {
              "target": "columns",
              "type": "value",
              "value": [
                "split_country",
                "geocoded_country",
              ],
            },
          ],
        },

        // {
        //   "ui": {
        //     "x": 2380,
        //     "y": 490,
        //   },
        //   "name": "transformation-13",
        //   "type": "adaptor",
        //   "adaptor": "join-datatables",
        //   "description": null,
        //   "binding": [
        //     {
        //       "target": "main data",
        //       "type": "transformation",
        //       "transformation": "transformation-11",
        //       "argument": "data",
        //     },
        //     {
        //       "target": "main column",
        //       "type": "value",
        //       "value": "geocoded_country",
        //     },
        //     {
        //       "target": "other column",
        //       "type": "value",
        //       "value": "country",
        //     },
        //   ],
        // },
        // {
        //   "ui": {
        //     "x": 2600,
        //     "y": 260,
        //   },
        //   "name": "transformation-16",
        //   "type": "adaptor",
        //   "adaptor": "datatable-to-csv",
        //   "description": null,
        //   "binding": [],
        // },
        // {
        //   "ui": {
        //     "x": 2800,
        //     "y": 260,
        //   },
        //   "name": "transformation-17",
        //   "type": "adaptor",
        //   "adaptor": "text-to-file",
        //   "description": null,
        //   "binding": [
        //     {
        //       "target": "name",
        //       "type": "value",
        //       "value": "geocoding_income.csv",
        //     },
        //     {
        //       "target": "text",
        //       "type": "transformation",
        //       "transformation": "transformation-16",
        //       "argument": "csv",
        //     },
        //   ],
        // },
        // {
        //   "ui": {
        //     "x": 2650,
        //     "y": 500,
        //   },
        //   "name": "transformation-18",
        //   "type": "adaptor",
        //   "adaptor": "datatable-to-csv-file",
        //   "description": null,
        //   "binding": [
        //     {
        //       "target": "data",
        //       "type": "transformation",
        //       "transformation": "transformation-13",
        //       "argument": "data",
        //     },
        //     {
        //       "target": "filename",
        //       "type": "value",
        //       "value": "geocoding-income-region",
        //     },
        //   ],
        // },
      ],
      "version": 2,
    },
    "name": "AMR Landscape to Microreact SA16/6 2",
  },
];
