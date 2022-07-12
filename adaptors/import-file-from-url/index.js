const FS = require("fs");
const Path = require("path");
const { URL } = require("url");
const StreamPromises = require("stream/promises");
const contentDisposition = require("content-disposition");

const { Curl, curly } = require("node-libcurl");
const SFTPClient = require("ssh2-sftp-client");

const { FileStream } = require("../../types/file");
const { EmptyObject } = require("../../constants");

const allowedProtocols = [
  "data:",
  "ftp:",
  "http:",
  "https:",
  "sftp:",
];

module.exports = async function (args) {
  const parsedUrlInfo = new URL(args.url);

  if (!allowedProtocols.includes(parsedUrlInfo.protocol)) {
    throw new Error("Unsupported protocol");
  }

  let file;

  if (parsedUrlInfo.protocol === "sftp:") {
    const client = new SFTPClient();
    await client.connect({
      host: parsedUrlInfo.host,
      username: parsedUrlInfo.username,
      privateKey: FS.readFileSync(`${process.env.HOME}/.ssh/id_rsa`),
      // password: parsedUrlInfo.password,
    });

    file = await FileStream.createEmpty();

    await client.fastGet(parsedUrlInfo.pathname, file.getSource());
    await client.end();
  }
  else {
    const { statusCode, data, headers } = await curly(
      args.url,
      {
        curlyStreamResponse: true,
        FOLLOWLOCATION: true,
      },
    );

    if (
      (parsedUrlInfo.protocol === "ftp:" && statusCode !== 150 /* File status okay */)
      ||
      (parsedUrlInfo.protocol === "http:" && statusCode !== 200 /* File status okay */)
      ||
      (parsedUrlInfo.protocol === "https:" && statusCode !== 200 /* File status okay */)
    ) {
      throw new Error(`Request status code ${statusCode}`);
    }

    const fileWriter = await FileStream.createWriter();

    await StreamPromises.pipeline(
      data,
      fileWriter,
    );

    file = await fileWriter.finalise();

    const lastHequestHeaders = headers.length ? headers[headers.length - 1] : EmptyObject;

    file.mediaType = lastHequestHeaders["content-type"] || "application/octet-stream";

    if (lastHequestHeaders["content-disposition"]) {
      const { parameters } = contentDisposition.parse(lastHequestHeaders["content-disposition"]);
      file.name = parameters.filename;
    }
  }

  if (args["output file name"]) {
    file.name = args["output file name"];
  }
  else {
    file.name = Path.basename(parsedUrlInfo.pathname) || "file";
  }

  return { file };
};

module.exports.manifest = require("./manifest");
