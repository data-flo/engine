const fs = require("fs");

module.exports = async function (args) {
  const text = await fs.promises.readFile(
    args.file.getSource(),
    args.encoding,
  );

  return {
    text,
  };
};

module.exports.manifest = require("./manifest.js");
