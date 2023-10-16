const exists = require("cgps-stdlib/files/exists.js");
const createIndex = require("./create-index.js");
const writeIndex = require("./write-index.js");

module.exports = async function (source) {
  const indexFilePath = `${source}.fileindex`;
  if (await exists(indexFilePath)) {
    // return readIndex(indexFilePath);
  }
  const index = await createIndex(source);
  await writeIndex(indexFilePath, index);
  return index;
};
