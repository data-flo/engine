const toString = require("stream-to-string");

module.exports = async function (args) {
  const text = await toString(args.file.getReader(), args.encoding);
  return { text };
};

module.exports.manifest = require("./manifest");
