const fs = require("fs");
const path = require("path");
const manifests = require("./dataflow.json");

const inputs = {
  "epi": (path.resolve(__dirname, "UK_COG_data_epi.csv")),
  "lab": (path.resolve(__dirname, "UK_COG_data_lab.csv")),
};

module.exports = {
  inputs,
  manifest: manifests[0].manifest,
};
