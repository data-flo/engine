const path = require("path");
const SambaClient = require("samba-client");

const { FileStream } = require("../../types/file.js");
const lastElement = require("../../utils/arrays/last-element.js");

const cleanErrorMessage = require("../../utils/file/clean-smb-error.js");

function rewriteShareAddress(shareAddress) {
  if (/^smb:\/\//i.test(shareAddress)) {
    return shareAddress.substr(4);
  }

  return shareAddress.replace(/\\/g, "/");
}

module.exports = async function (args) {
  const shareAddress = rewriteShareAddress(args["share address"]);

  try {
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
  }
  catch (err) {
    cleanErrorMessage(err, args);
    throw err;
  }
};

module.exports.manifest = require("./manifest.js");

module.exports.cleanErrorMessage = cleanErrorMessage;
