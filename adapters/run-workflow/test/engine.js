/* eslint-disable class-methods-use-this */

const DatafloEngine = require("../../../index.js");

const manifest = require("./manifest.json");

function createEngine(adaptor) {
  class Engine extends DatafloEngine {
    async getAdaptorExecutable(name) {
      if (name === "run-workflow") {
        return adaptor;
      }
      else {
        return super.getAdaptorExecutable(name);
      }
    }

    async getDataflowManifest() {
      return manifest;
    }

    // async runAdaptor(args) {
    //   return super.runAdaptor(null, args);
    // }
  }
  const engine = new Engine();
  return engine;
}

module.exports = createEngine;
