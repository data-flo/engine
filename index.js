import runAdaptor  from "./runner/run-adaptor";
import runDataflow  from "./runner/run-dataflow";
import getAdaptorExecutable  from "./runner/get-adaptor-executable";
import getAdaptorManifest  from "./runner/get-adaptor-manifest";
import mapFile  from "./utils/file/map";
/* eslint-disable class-methods-use-this */

// const Filehound = require("filehound");







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

  async runAdaptor(name, args) {
    const adaptor = await this.getAdaptorExecutable(name);
    return runAdaptor(adaptor, args);
  }

  runDataflow(manifest, args, options) {
    return runDataflow(manifest, args, options, this);
  }
}

export default function (config) {
  return new Engine(config);
};
