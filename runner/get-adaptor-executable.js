const path = require("path");

module.exports = function getAdaptorExecutable(name) {
  const executable = require(
    path.join(
      __dirname,
      "..",
      "adaptors",
      name,
      "index.js",
    ),
  );
  return executable;
};
