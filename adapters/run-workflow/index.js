module.exports = async function (args) {
  const { workflow, ...rest } = args;
  if (!workflow) {
    throw new Error("A value is required for input workflow");
  }
  const manifest = await this.getDataflowManifest(args.workflow);
  const run = await this.runWorkflow(
    manifest,
    rest,
  );
  return run.outputs;
};

module.exports.manifest = require("./manifest.js");
