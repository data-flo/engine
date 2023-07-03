/* eslint-disable class-methods-use-this */

// const Filehound = require("filehound");

const runAdaptor = require("./runner/run-adaptor");
const runDataflow = require("./runner/run-dataflow");
const getAdaptorExecutable = require("./runner/get-adaptor-executable");
const getAdaptorManifest = require("./runner/get-adaptor-manifest");
// const mapFile = require("./utils/file/map");

// globalTunnel.initialize();

class Engine {
  defaults = {};

  fsMappings = {};

  getAdaptorManifest = getAdaptorManifest;

  getAdaptorExecutable = getAdaptorExecutable;

  // constructor() {
  // }

  // mapFile(filePath) {
  //   return mapFile(
  //     filePath,
  //     this.fsMappings,
  //   );
  // }

  getDataflowManifest(name) {
    throw new Error(`Cannot resolve manifest for dataflow ${name}.`);
  }

  runAdaptor(name, args) {
    const adaptor = this.getAdaptorExecutable(name);
    return runAdaptor(adaptor, args);
  }

  runDataflow(manifest, args) {
    return runDataflow(manifest, args, false, this);
  }

  debugDataflow(manifest, args) {
    return runDataflow(manifest, args, true, this);
  }
}

module.exports = Engine;
