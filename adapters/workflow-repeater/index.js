module.exports = async function (args) {
  const workflowManifest = await this.getDataflowManifest(args.workflow);

  const inColumns = {};
  for (const workflowInput of workflowManifest.input) {
    const argumentName = `${workflowInput.name} column`;
    if (argumentName in args) {
      inColumns[workflowInput.name] = args[argumentName];
    }
  }
  await args.data.shouldIncludeColumns(Object.values(inColumns));

  const outColumns = {};
  for (const workflowInput of workflowManifest.output) {
    const argumentName = `${workflowInput.name} column`;
    if (argumentName in args) {
      outColumns[workflowInput.name] = args[argumentName];
    }
  }
  await args.data.shouldExcludeColumns(Object.values(outColumns));

  const data = await args.data.transformAsync(
    async (row) => {
      const workflowInputs = {};
      for (const [ argumentName, columnName ] of Object.entries(inColumns)) {
        workflowInputs[argumentName] = row[columnName];
      }

      const run = await this.runWorkflow(workflowManifest, workflowInputs);

      for (const [ argumentName, columnName ] of Object.entries(outColumns)) {
        row[columnName] = run.outputs[argumentName];
      }

      return row;
    },
  );

  return { data };
};

module.exports.manifest = require("./manifest.js");
