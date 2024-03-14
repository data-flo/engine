const SambaClient = require("samba-client");

const parseSMBSharePath = require("../../utils/file/parse-smb-share-path.js");
const cleanErrorMessage = require("../../utils/file/clean-smb-error.js");

module.exports = async function (args) {
  const [ shareAddress, remoteFilePath ] = parseSMBSharePath(
    args["share address"],
    args["file path"],
  );

  try {
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
  }
  catch (err) {
    cleanErrorMessage(err, args);
    throw err;
  }

  return { file: args.file };
};

module.exports.manifest = require("./manifest.js");
