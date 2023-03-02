module.exports = function (args) {
  const list = [
    ...args["first list"],
    ...args["second list"],
  ];
  return {
    list,
  };
};

module.exports.manifest = require("./manifest");
