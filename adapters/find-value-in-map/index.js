module.exports = function (args) {
  if (args.map.has(args.key)) {
    return {
      value: args.map.get(args.key),
    };
  }
  else {
    return {
      value: args["default value"],
    };
  }
};

module.exports.manifest = require("./manifest.js");
