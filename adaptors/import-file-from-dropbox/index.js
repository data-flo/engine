import { FileStream }  from "../../types/file";
import getRequestAsStream  from "../../utils/requests/get-as-stream";


export default async function (args) {
  const validUrl = /^https:\/\/www\.dropbox\.com\/s\/(.+)\/?/i;

  const match = validUrl.exec(args.url);

  if (!match || !match[1]) {
    throw new Error("Invalid Dropbox file URL.");
  }

  const url = `https://www.dropbox.com/s/dl/${match[1]}`;

  const stream = await getRequestAsStream(url);

  const file = await FileStream.createFromStream(stream);

  return { file };
};

export { default as manifest } from "./manifest";
