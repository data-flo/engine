const tap = require("tap");

const fs = require("fs");

tap.compare = function (filePath, expectedFileContent) {
  let actual = fs.readFileSync(filePath, "utf8");
  if (actual.startsWith("\ufeff")) {
    actual = actual.substring(1);
  }
  return tap.equal(actual, expectedFileContent);
};

tap._test = () => {};

module.exports = tap;
