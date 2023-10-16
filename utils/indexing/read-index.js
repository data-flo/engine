const fs = require("fs");

module.exports = async function (indexFilePath) {
  const json = await fs.promises.readFile(indexFilePath, "utf8");
  return JSON.parse(json);
};
