const exists = require("cgps-stdlib/files/exists.js");

const readIndex = require("./read-index.js");
const createIndex = require("./create-index.js");
const writeIndex = require("./write-index.js");

async function getDatatableIndex(source) {
  const indexFilePath = `${source}.dataindex`;

  if (await exists(indexFilePath)) {
    return readIndex(indexFilePath);
  }

  const index = await createIndex(source, 1);
  await writeIndex(
    indexFilePath,
    index,
  );

  return index;
}

module.exports = getDatatableIndex;
