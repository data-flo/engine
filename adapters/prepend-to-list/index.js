module.exports = function (args) {
  const list = [
    args.value,
    ...args.list,
  ];

  return { list };
};

module.exports.manifest = require("./manifest.js");
