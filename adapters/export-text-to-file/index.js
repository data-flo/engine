const { FileStream } = require("../../types/file.js");

module.exports = async function (args) {
  const writer = await FileStream.createWriter();

  writer.setDefaultEncoding(args.encoding);

  writer.write(args.text);

  writer.end();

  const file = await writer.finalise();

  file.name = args["output file name"];
  file.mediaType = "text/plain";

  return {
    file,
  };
};

module.exports.manifest = require("./manifest.js");
