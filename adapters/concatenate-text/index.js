module.exports = function (args) {
  return { combination: `${args["text one"]}${args.separator}${args["text two"]}` };
};

module.exports.manifest = require("./manifest.js");
