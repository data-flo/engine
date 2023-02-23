import test from "node:test";
import fs from "fs";

const tap = {};

tap.compareFile = function (filePath, expectedFileContent) {
  let actual = fs.readFileSync(filePath, "utf8");
  if (actual.startsWith("\ufeff")) {
    actual = actual.substring(1);
  }
  return tap.equal(actual, expectedFileContent);
};

tap.test = test;

tap._test = () => {};

export default tap;
