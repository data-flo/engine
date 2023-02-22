import path  from "path";
import SambaClient  from "samba-client";
import { FileStream }  from "../../types/file";
import parseSMBSharePath  from "../../utils/file/parse-smb-share-path";





export default async function (args) {
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

export { default as manifest } from "./manifest";
