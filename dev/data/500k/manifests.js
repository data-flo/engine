module.exports = [
  {
    "identifier": "4NaCFWY92Q2aY1p1bQweqW",
    "manifest": {
      "input": [],
      "output": [
        {
          "ui": {
            "x": 0,
            "y": 0,
          },
          "argument": "data",
          "description": "",
          "name": "data",
          "transformation": "transformation-3",
          "type": "datatable",
        },
      ],
      "transform": [
        {
          "name": "transformation-3",
          "type": "adaptor",
          "adaptor": "split-geographical-coordinates",
          "description": null,
          "binding": [
            {
              "target": "data",
              "type": "value",
              "value": {
                "source": "engine/dev/data/500k/dataset.csv",
              },
            },
            {
              "target": "coordinates column",
              "type": "value",
              "value": "lat_lon",
            },
          ],
          "ui": {
            "x": 316,
            "y": 34,
          },
          "label": "#3",
        },

        // {
        //   "name": "transformation-1",
        //   "type": "adaptor",
        //   "adaptor": "import-from-csv-file",
        //   "description": null,
        //   "binding": [
        //     {
        //       "target": "file",
        //       "type": "value",
        //       "value": {
        //         "hash": "ad0e614f4d409de1649f139c0e19a39e354c2819",
        //         "source": "/Users/ka10/code/data-flo/studio/files/ad/0e614f4d409de1649f139c0e19a39e354c2819",
        //         "name": "test_data_500Krow_66column.csv",
        //       },
        //     },
        //   ],
        //   "ui": {
        //     "x": 72,
        //     "y": 34,
        //   },
        //   "label": "#1",
        // },
      ],
      "version": 3,
    },
    "name": "500k",
  },
];
