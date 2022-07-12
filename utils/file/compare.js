const fs = require("fs");

module.exports = function compare(filePath, expectedFileContent) {
  let actual = fs.readFileSync(filePath, "utf8");
  if (actual.startsWith("\ufeff")) {
    actual = actual.substring(1);
  }
  return (actual === expectedFileContent);
};
