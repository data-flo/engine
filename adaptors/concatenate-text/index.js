module.exports = function (args) {
  return { combination: `${args.left}${args.separator}${args.right}` };
};

module.exports.manifest = require("./manifest");
