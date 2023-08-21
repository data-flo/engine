const parseInputArguments = require("./parse-input-arguments");
const parseOutputArguments = require("./parse-output-arguments");

module.exports = async function runAdaptor(adaptorExecutable, rawValues) {
  if (!adaptorExecutable.manifest) {
    throw new Error("Cannot find manifest in adaptor");
  }

  // check input against manifest
  const input = parseInputArguments(adaptorExecutable.manifest.input, rawValues);

  // execute adaptor function
  const rawOutput = await adaptorExecutable.call(this, input);

  // check output against manifest
  const output = parseOutputArguments(adaptorExecutable.manifest.output, rawOutput);

  return output;
};
