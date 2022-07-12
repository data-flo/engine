const { URL } = require("url");
const StreamPromises = require("stream/promises");
const contentDisposition = require("content-disposition");

const { curly } = require("node-libcurl");

const { FileStream } = require("../../types/file");
const { EmptyObject } = require("../../constants");

const allowedProtocols = [
  "data:",
  "ftp:",
  "http:",
  "https:",
];

module.exports = async function (args) {
  const url = new URL(args.url);

  if (!allowedProtocols.includes(url.protocol)) {
    throw new Error("Unsupported protocol");
  }

  const { statusCode, data, headers } = await curly.get(
    args.url,
    {
      curlyStreamResponse: true,
      FOLLOWLOCATION: true,
    },
  );

  if (statusCode !== 200) {
    throw new Error(`Request status code ${statusCode}`);
  }

  const fileWriter = await FileStream.create();

  await StreamPromises.pipeline(
    data,
    fileWriter,
  );

  const file = await fileWriter.finalise();

  const lastHequestHeaders = headers.length ? headers[headers.length - 1] : EmptyObject;

  file.mediaType = lastHequestHeaders["content-type"] || "application/octet-stream";

  if (args["output file name"]) {
    file.name = args["output file name"];
  }
  else if (lastHequestHeaders["content-disposition"]) {
    const { parameters } = contentDisposition.parse(lastHequestHeaders["content-disposition"]);
    file.name = parameters.filename;
  }
  else {
    file.name = "file";
  }

  return { file };
};

module.exports.manifest = require("./manifest");
