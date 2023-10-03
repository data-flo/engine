const tap = require("tap");

const fs = require("fs");
const zlib = require("zlib");
const isGzip = require("is-gzip");

tap.compareFile = function (filePath, expectedFileContent) {
  let actual = fs.readFileSync(filePath);
  if (isGzip(actual)) {
    actual = zlib.gunzipSync(actual);
  }
  actual = actual.toString("utf8");

  if (actual.startsWith("\ufeff")) {
    actual = actual.substring(1);
  }

  return tap.equal(actual, expectedFileContent);
};

tap._test = () => {};

module.exports = tap;
