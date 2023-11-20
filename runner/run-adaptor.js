const hash = require("../utils/cache/hash.js");
const cache = require("../utils/cache/index.js");
// const stopwatch = require("../utils/stopwatch.js");

const parseInputArguments = require("./parse-input-arguments.js");
const parseOutputArguments = require("./parse-output-arguments.js");

module.exports = async function runAdaptor(
  adaptorExecutable,
  rawValues,
  useCache = (!!process.env.DF_USE_CACHE) ?? false,
) {
  if (!adaptorExecutable.manifest) {
    throw new Error("Cannot find manifest in adaptor");
  }

  // check input against manifest
  const input = (
    adaptorExecutable.manifest.dynamic
      ?
      rawValues
      :
      parseInputArguments(
        adaptorExecutable.manifest.input,
        rawValues,
      )
  );

  let rawOutput;
  if (useCache) {
    const checksum = hash(input);
    rawOutput = await cache(
      `adapters/${adaptorExecutable.manifest.name}/${checksum}`,
      async () => adaptorExecutable.call(this, input),
    );
  }
  else {
    rawOutput = await adaptorExecutable.call(this, input);
  }

  // stopwatch.report();

  // execute adaptor function
  // const rawOutput = await adaptorExecutable.call(this, input);

  // check output against manifest
  const output = (
    adaptorExecutable.manifest.dynamic
      ?
      rawOutput
      :
      parseOutputArguments(
        adaptorExecutable.manifest.output,
        rawOutput,
      )
  );

  return output;
};
