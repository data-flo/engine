const path = require("path");

module.exports = function getAdaptorManifest(name) {
  const manifest = require(
    path.join(
      __dirname,
      "..",
      "adaptors",
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
};
