const tmp = require("tmp-promise");
const fs = require("fs");

module.exports = async function createTmpTextFile(textContent) {
  const { fd, path, cleanup } = await tmp.file({ discardDescriptor: true });
  fs.writeFileSync(
    path,
    textContent,
  );
  return path;
};
