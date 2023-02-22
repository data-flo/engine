import { FileStream }  from "../../types/file";
import getRequestAsStream  from "../../utils/requests/get-as-stream";


export default async function (args) {
  const validUrl = /^https:\/\/drive\.google\.com\/(?:file\/d\/|open\?id=)([^\/]+)/i;

  const match = validUrl.exec(args.url);

  if (!match || !match[1]) {
    throw new Error("Invalid Google Drive URL.");
  }

  const url = `https://drive.google.com/uc?id=${match[1]}&export=download&confirm=no_antivirus`;

  const stream = await getRequestAsStream(url);

  const file = await FileStream.createFromStream(stream);

  return { file };
};

export { default as manifest } from "./manifest";
