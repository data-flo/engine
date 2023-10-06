const path = require("path");
const manifests = require("./manifests.js");

const inputs = {};

module.exports = {
  inputs,
  manifest: manifests[0].manifest,
};
