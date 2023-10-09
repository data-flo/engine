module.exports = [
  {
    "id": "pfwUFWvFPTgHif4bLHmk8q",
    "manifest": {
      "input": [],
      "output": [],
      "transform": [
        {
          "name": "transformation-1",
          "type": "adaptor",
          "adaptor": "import-from-csv-file",
          "description": null,
          "binding": [
            {
              "target": "file",
              "type": "value",
              "value": {
                "source": "engine/dev/data/500k/dataset.csv",
                "name": "dataset.csv",
              },
            },
          ],
          "ui": {
            "x": 120,
            "y": 150,
          },
          "label": "#1",
        },
        {
          "name": "transformation-2",
          "type": "adaptor",
          "adaptor": "split-geographical-coordinates",
          "description": null,
          "binding": [
            {
              "target": "data",
              "type": "transformation",
              "transformation": "transformation-1",
              "argument": "data",
            },
            {
              "target": "coordinates column",
              "type": "value",
              "value": "lat_lon",
            },
          ],
          "ui": {
            "x": 300,
            "y": 260,
          },
          "label": "#2",
        },
        {
          "name": "transformation-3",
          "type": "adaptor",
          "adaptor": "select-columns",
          "description": null,
          "binding": [
            {
              "target": "data",
              "type": "transformation",
              "transformation": "transformation-2",
              "argument": "data",
            },
            {
              "target": "column names",
              "type": "value",
              "value": [
                "lat_lon",
                "latitude",
                "longitude",
              ],
            },
          ],
          "ui": {
            "x": 510,
            "y": 320,
          },
          "label": "#3",
        },
        {
          "name": "transformation-4",
          "type": "adaptor",
          "adaptor": "reverse-geocoding",
          "description": null,
          "binding": [
            {
              "target": "data",
              "type": "transformation",
              "transformation": "transformation-3",
              "argument": "data",
            },
            {
              "target": "location column",
              "type": "value",
              "value": "country code",
            },
          ],
          "ui": {
            "x": 690,
            "y": 370,
          },
          "label": "#4",
        },
      ],
      "version": 3,
    },
    "name": "Untitled Workflow",
  },
];
