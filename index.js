/* eslint-disable class-methods-use-this */

// const Filehound = require("filehound");
const path = require("path");

const runAdaptor = require("./runner/run-adaptor.js");
const runDataflow = require("./runner/run-dataflow.js");
const getAdaptorExecutable = require("./runner/get-adaptor-executable.js");

// globalTunnel.initialize();

class Engine {
  defaults = {};

  fsMappings = {};

  async getAdaptorExecutable(name) {
    return getAdaptorExecutable(name);
  }

  async getAdaptorManifest(name) {
    const adaptor = await this.getAdaptorExecutable(name);
    return adaptor.manifest;
  }

  // constructor() {
  // }

  // mapFile(filePath) {
  //   return mapFile(
  //     filePath,
  //     this.fsMappings,
  //   );
  // }

  async getDataflowManifest(name) {
    throw new Error(`Cannot resolve manifest for dataflow ${name}.`);
  }

  async runAdaptor(name, args) {
    const adaptor = await this.getAdaptorExecutable(name);
    return runAdaptor.call(this, adaptor, args);
  }

  async runDataflow(manifest, args) {
    return runDataflow(manifest, args, false, this);
  }

  async debugDataflow(manifest, args) {
    return runDataflow(manifest, args, true, this);
  }
}

module.exports = Engine;
