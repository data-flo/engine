module.exports = function (args) {
  const list = (
    Array.from(
      new Set(args.list)
    )
  );

  return { list };
};

module.exports.manifest = require("./manifest.js");
