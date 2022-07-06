/* eslint-disable class-methods-use-this */

const path = require("path");
const Filehound = require("filehound");
// const globalTunnel = require("global-tunnel-ng");

const runAdaptor = require("./runner/run-adaptor");
const runDataflow = require("./runner/run-dataflow");
const mapFile = require("./utils/file/map");

// globalTunnel.initialize();

class Engine {
  defaults = {};

  fsMappings = {};

  constructor(config = {}) {
    Object.assign(this, config);
    // TODO: remove .bind
    // this.getDataflowManifest = this.getDataflowManifest.bind(this);
  }

  cache(key, valueGetter) {
    return valueGetter();
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

  getAdaptorsFolder() {
    return path.join(
      __dirname,
      "adaptors",
    );
  }

  getAdaptorManifest(name) {
    const manifest = require(
      path.join(
        this.getAdaptorsFolder(),
        name,
        "manifest.js",
      ),
    );

    // TODO: override defaults
    // if (typeof this.options.defaults[name] !== "undefined") {
    //   for (const [key, value] of Object.entries(this.options.defaults[name])) {
    //     const input = manifest.input.find((x) => x.name === key);
    //     if (typeof input !== "undefined") {
    //       if (typeof input.default !== "undefined" && input.default !== "") {
    //         input.description = input.description.replace(`\`${input.default}\``, value);
    //       }
    //       input.default = value;
    //     }
    //     else {
    //       throw new Error(`Cannot override default value for input argument ${key} of ${name} adaptor.`);
    //     }
    //   }
    // }

    return manifest;
  }

  getAdaptorExecutable(name) {
    const executable = require(
      path.join(
        this.getAdaptorsFolder(),
        name,
        "index.js",
      ),
    );
    return executable;
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
