import tmp  from "tmp-promise";
import fs  from "fs";


export default async function createTmpTextFile(textContent) {
  const { fd, path, cleanup } = await tmp.file({ discardDescriptor: true });
  fs.writeFileSync(
    path,
    textContent,
  );
  return path;
};
