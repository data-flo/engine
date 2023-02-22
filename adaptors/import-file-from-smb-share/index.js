import path  from "path";
import SambaClient  from "samba-client";
import { FileStream }  from "../../types/file";
import lastElement  from "../../utils/arrays/last-element";





export default async function (args) {
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

export { default as manifest } from "./manifest";
