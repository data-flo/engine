import fs  from "fs";
import tmp  from "./tmp";


function awaitStream(stream, endEventName = "end") {
  return new Promise((resolve, reject) => {
    stream.on(endEventName, resolve);
    stream.on("error", resolve);
  });
}

export default async function (file) {
  if (file.path && !file.__isRequestRequest) {
    return file.path;
  }

  const path = await tmp({ postfix: ".ods" });
  const stream = fs.createWriteStream(path);
  file.pipe(stream);
  await awaitStream(file);

  return path;
};
