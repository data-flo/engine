const StreamPromises = require("stream/promises");

const { FileStream } = require("../../types/file");
const getRequestAsStream = require("../../utils/request/get-as-stream");

module.exports = async function (args, context) {
  const validUrl = /^https:\/\/www\.dropbox\.com\/s\/(.+)\/?/i;

  const match = validUrl.exec(args.url);

  if (!match || !match[1]) {
    throw new Error("Invalid Dropbox file URL.");
  }

  const url = `https://www.dropbox.com/s/dl/${match[1]}`;

  const data = await getRequestAsStream(url);

  const fileWriter = await FileStream.createWriter();

  await StreamPromises.pipeline(
    data,
    fileWriter,
  );

  const file = await fileWriter.finalise();

  file.name = data.name;
  file.mediaType = data.mediaType;

  return { file };
};

module.exports.manifest = require("./manifest");