const makeRegexp = require("../../utils/text/make-regexp");

module.exports = function (args) {
  const regexp = makeRegexp(args.pattern);
  const index = args.list.findIndex((item) => regexp.test(item));
  return {
    value: (index >= 0) ? args.list[index] : null,
    index: (index >= 0) ? index + 1 : null,
  };
};

module.exports.manifest = require("./manifest.js");
