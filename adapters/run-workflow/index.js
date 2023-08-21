module.exports = async function (args) {
  const manifest = await this.getDataflowManifest(args.workflow);
  const outputs = await this.runDataflow(manifest, args);
  return outputs;
};

module.exports.manifest = require("./manifest.js");
