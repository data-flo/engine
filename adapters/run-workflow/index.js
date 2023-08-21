module.exports = async function (args) {
  const manifest = await this.getDataflowManifest(args.workflow);
  const run = await this.runDataflow(manifest, args);
  return run.outputs;
};

module.exports.manifest = require("./manifest.js");
