const parseInputArguments = require("./parse-input-arguments");
const parseOutputArguments = require("./parse-output-arguments");

module.exports = async function runAdaptor(name, rawValues, engineInstance) {
  const manifest = engineInstance.getAdaptorManifest(name);
  const executable = engineInstance.getAdaptorExecutable(name);

  // check input against manifest
  const input = parseInputArguments(manifest.input, rawValues);

  // execute adaptor function
  const rawOutput = await executable(input);

  // check output against manifest
  const output = parseOutputArguments(manifest.output, rawOutput);

  return output;
};
