import parseInputArguments  from "./parse-input-arguments";
import parseOutputArguments  from "./parse-output-arguments";


export default async function runAdaptor(adaptorExecutable, rawValues) {
  console.log({adaptorExecutable})
  if (!adaptorExecutable.manifest) {
    throw new Error("Cannot find manifest in adaptor");
  }

  // check input against manifest
  const input = parseInputArguments(adaptorExecutable.manifest.input, rawValues);

  // execute adaptor function
  const rawOutput = await adaptorExecutable(input);

  // check output against manifest
  const output = parseOutputArguments(adaptorExecutable.manifest.output, rawOutput);

  return output;
};
