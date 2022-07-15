/*

      "ui": { "column-in": "data" },
      "required": true,
      "required": false,
      "ui": { "can-be-one-of": DateFormats },
      "ui": { "must-be-one-of": DurationUnits },
\nIf unspecified, defaults to
*/

/* eslint-disable class-methods-use-this */

// const Filehound = require("filehound");

const runAdaptor = require("./runner/run-adaptor");
const runDataflow = require("./runner/run-dataflow");
const getAdaptorExecutable = require("./runner/get-adaptor-executable");
const getAdaptorManifest = require("./runner/get-adaptor-manifest");
const mapFile = require("./utils/file/map");

// globalTunnel.initialize();

class Engine {
  defaults = {};

  fsMappings = {};

  getAdaptorManifest = getAdaptorManifest;

  getAdaptorExecutable = getAdaptorExecutable;

  constructor(config = {}) {
    Object.assign(this, config);
    // TODO: remove .bind
    // this.getDataflowManifest = this.getDataflowManifest.bind(this);
  }

  mapFile(filePath) {
    return mapFile(
      filePath,
      this.fsMappings,
    );
  }

  getDataflowManifest(name) {
    if (this.options.getDataflowManifest && typeof this.options.getDataflowManifest === "function") {
      return this.options.getDataflowManifest(name);
    } else {
      throw new Error(`Cannot resolve manifest for dataflow ${name}.`);
    }
  }

  runAdaptor(name, args) {
    return runAdaptor(name, args, this);
  }

  runDataflow(manifest, args, options) {
    return runDataflow(manifest, args, options, this);
  }
}

module.exports = function (config) {
  return new Engine(config);
};
