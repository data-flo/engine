const { FileStream } = require("../../types/file.js");
const getRequestAsStream = require("../../utils/requests/get-as-stream.js");

module.exports = async function (args) {
  const validUrl = /^https:\/\/www\.dropbox\.com\//i;

  const match = validUrl.exec(args.url);

  if (!match) {
    throw new Error("Invalid Dropbox file URL");
  }

  const url = args.url.replace("dl=0", "dl=1");

  const stream = await getRequestAsStream(url);

  const file = await FileStream.createFromStream(stream);

  // TODO: Handle incorrect file paths
  // Dropbox returns a 200, even if the URL is wrong, instead of a 404

  return { file };
};

module.exports.manifest = require("./manifest.js");
