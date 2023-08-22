module.exports = function (args) {
  const map = args.map || new Map();
  if (args.overwrite || !map.has(args.key)) {
    map.set(args.key, args.value);
  }
  return {
    map,
  };
};

module.exports.manifest = require("./manifest.js");
