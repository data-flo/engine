import tap  from "tap";
import fs  from "fs";



tap.compareFile = function (filePath, expectedFileContent) {
  let actual = fs.readFileSync(filePath, "utf8");
  if (actual.startsWith("\ufeff")) {
    actual = actual.substring(1);
  }
  return tap.equal(actual, expectedFileContent);
};

tap._test = () => {};

export default tap;
