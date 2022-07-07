const request = require("request");

module.exports = async function (args) {
  const file = request(args.url);
  return { file };
};

module.exports.manifest = require("./manifest");
