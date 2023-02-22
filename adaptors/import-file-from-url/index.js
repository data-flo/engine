import Path  from "path";
import { URL }  from "url";
import StreamPromises  from "stream/promises";
import SFTPClient  from "ssh2-sftp-client";
import { FileStream }  from "../../types/file";
import getRequestAsStream  from "../../utils/requests/get-as-stream";








const allowedProtocols = [
  "data:",
  "ftp:",
  "http:",
  "https:",
  "sftp:",
];

export default async function (args) {
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
      password: parsedUrlInfo.password,
      // privateKey: FS.readFileSync(`${process.env.HOME}/.ssh/id_rsa`),
    });

    file = await FileStream.createEmpty();

    await client.fastGet(parsedUrlInfo.pathname, file.getSource());
    await client.end();
  }
  else {
    const data = await getRequestAsStream(args.url);

    file = await FileStream.createFromStream(data);
  }

  if (args["output file name"]) {
    file.name = args["output file name"];
  }

  file.name = file.name || Path.basename(parsedUrlInfo.pathname) || "file";

  return { file };
};

export { default as manifest } from "./manifest";
