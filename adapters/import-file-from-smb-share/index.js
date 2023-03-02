const path = require("path");
const SambaClient = require("samba-client");

const { FileStream } = require("../../types/file");
const lastElement = require("../../utils/arrays/last-element");

module.exports = async function (args) {
  let shareAddress = args["share address"];
  if (/^smb:\/\//i.test(shareAddress)) {
    shareAddress = shareAddress.substr(4);
  }
  shareAddress = shareAddress.replace(/\\/g, "/");

  const client = new SambaClient({
    address: shareAddress,
    domain: args.domain,
    username: args.username,
    password: args.password,
    port: args.port,
    // maxProtocol: 'SMB3', // not required
    // maskCmd: true, // not required, defaults to false
  });

  let remoteFilePath = args["file path"];
  if (remoteFilePath.startsWith(args["share address"])) {
    remoteFilePath = remoteFilePath.substr(args["share address"].length);
  }
  remoteFilePath = remoteFilePath.replace(/\\/g, "/");
  if (remoteFilePath.startsWith("/")) {
    remoteFilePath = remoteFilePath.substr(1);
  }

  const name = lastElement(remoteFilePath.split("/")) || "file";

  const file = await FileStream.createEmpty({ name });

  await client.getFile(
    remoteFilePath,
    path.basename(file.getSource()),
    path.dirname(file.getSource()),
  );

  return { file };
};

module.exports.manifest = require("./manifest");
