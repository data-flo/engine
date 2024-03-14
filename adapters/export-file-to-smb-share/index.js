const SambaClient = require("samba-client");

const { FileStream } = require("../../types/file");
const parseSMBSharePath = require("../../utils/file/parse-smb-share-path");

module.exports = async function (args) {
  const [ shareAddress, remoteFilePath ] = parseSMBSharePath(
    args["share address"],
    args["file path"],
  );

  const client = new SambaClient({
    address: shareAddress,
    domain: args.domain,
    username: args.username,
    password: args.password,
    port: args.port,
  });

  if (!args.overwrite) {
    if (await client.fileExists(remoteFilePath)) {
      throw new Error("File Exists");
    }
  }

  await client.sendFile(
    args.file.getSource(),
    remoteFilePath,
  );

  return { file: args.file };
};

module.exports.manifest = require("./manifest.js");
