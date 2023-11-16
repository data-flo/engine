const Util = require("util");
const Path = require("path");

const Minio = require("minio");

const { FileStream } = require("../../types/file.js");

module.exports = async function (args) {
  const url = new URL(args.url);

  const minioClient = new Minio.Client({
    endPoint: url.hostname,
    port: parseInt(url.port),
    useSSL: (url.protocol !== "http:"),
    accessKey: args["access key"],
    secretKey: args["secret key"],
  });
  let file;
  if (args["access key"] === undefined || args["secret key"] === undefined) {
    const response = await fetch(
      args.url,
    );
    if (!response.ok) {
      throw new Error(`Request failed with status code ${response.status}: ${response.statusText}`);
    }
    file = await FileStream.createFromStream(response.body);
  }
  else {
    const [ _, bucket, ...rest ] = url.pathname.split("/");

    const fGetObject = Util.promisify(minioClient.fGetObject).bind(minioClient);

    file = await FileStream.createEmpty();

    await fGetObject(
      bucket,
      rest.join("/"),
      file.getSource(),
    );
  }

  file.name = Path.basename(url.pathname);

  return { file };
};

module.exports.manifest = require("./manifest.js");
