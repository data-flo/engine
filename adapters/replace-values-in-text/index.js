const makeRegexp = require("../../utils/text/make-regexp");

module.exports = function (args) {
  const pattern = makeRegexp(args.pattern, false, true);

  const text = args.text.replace(
    pattern,
    args.replacement,
  );

  return { text };
};

module.exports.manifest = require("./manifest.js");
