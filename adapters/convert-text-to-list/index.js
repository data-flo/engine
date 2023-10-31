const makeRegexp = require("../../utils/text/make-regexp.js");

module.exports = function (args) {
  let regex = makeRegexp(args.separator);
  if (args.separator === "\\u0020") {
    regex = "\u0020";
  }
  else if (args.separator === "\\u0009") {
    regex = "\u0009";
  }
  const text = (args.separator === "\n") ? args.text.replace(/\r\n/g, "\n") : args.text;

  const hasLimit = Number.isInteger(args.limit);

  const list = (
    text
      .trim()
      .split(regex)
      .filter((x) => x !== "")
      .filter((_, index) => !hasLimit || index < args.limit)
  );

  return { list };
};

module.exports.manifest = require("./manifest.js");
