const fs = require("fs");
const path = require("path");
const manifests = require("./manifests");

const inputs = {
  // "Metadata ENA": (path.resolve(__dirname, "abaumannii_20220401_V1.csv")),
  // "Metadata ENA": (path.resolve(__dirname, "100k.csv")),
  "Metadata ENA": (path.resolve(__dirname, "all.csv")),
  "ID's file": (path.resolve(__dirname, "abaumannii_20220401_V1.csv")),
};

module.exports = {
  inputs,
  manifest: manifests[0].manifest,
};
