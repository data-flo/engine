module.exports = function (args) {
  return {
    url: args.input,
  };
};

module.exports.manifest = require("./manifest");
