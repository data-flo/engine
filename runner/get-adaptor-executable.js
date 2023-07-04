const path = require("path");

module.exports = function getAdaptorExecutable(name) {
  const executable = require(
    path.join(
      path.resolve(
        process.env.ADAPTERS_PATH
        ??
        path.join(
          __dirname,
          "..",
          "adapters",
        )
      ),
      name,
      "index.js",
    ),
  );
  return executable;
};
