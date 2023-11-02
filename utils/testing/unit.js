const assert = require("assert");
const fs = require("fs");
const zlib = require("zlib");

const tap = require("tap");
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

  return assert.equal(actual, expectedFileContent);
};

tap._test = () => {};

module.exports = tap;

module.exports.compareFile = tap.compareFile;
