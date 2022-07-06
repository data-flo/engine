const path = require("path");

const parseInputArguments = require("./parse-input-arguments");
const parseOutputArguments = require("./parse-output-arguments");

function getAdaptorsFolder() {
  return path.join(
    __dirname,
    "..",
    "adaptors",
  );
}

function getAdaptorManifest(name) {
  const manifest = require(
    path.join(
      getAdaptorsFolder(),
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

function getAdaptorExecutable(name) {
  return require(path.join(getAdaptorsFolder(), name, "index.js"));
}

module.exports = async function runAdaptor(name, rawValues) {
  const manifest = getAdaptorManifest(name);
  const executable = getAdaptorExecutable(name);

  // check input against manifest
  const input = parseInputArguments(manifest.input, rawValues);

  // execute adaptor function
  const rawOutput = await executable(input);

  // check output against manifest
  const output = parseOutputArguments(manifest.output, rawOutput);

  return output;
};
