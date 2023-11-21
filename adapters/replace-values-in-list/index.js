const makeRegexp = require("../../utils/text/make-regexp");

module.exports = function (args) {
  const pattern = makeRegexp(args.pattern, false, true);

  const list = [];

  for (const item of args.list) {
    list.push(
      (item || "").replace(
        pattern,
        args.replacement,
      )
    );
  }

  return { list };
};

module.exports.manifest = require("./manifest.js");
