const fs = require("fs");

module.exports = async function (indexFilePath, index) {
  await fs.promises.writeFile(indexFilePath, JSON.stringify(index), "utf8");
};
