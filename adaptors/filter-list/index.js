const makeRegexp = require("../../utils/text/make-regexp");

module.exports = function (args) {
  const regexp = makeRegexp(args.pattern);
  const values = [];
  const complementary = [];
  for (const item of args.list) {
    if (regexp.test(item)) {
      values.push(item);
    }
    else {
      complementary.push(item);
    }
  }
  return {
    complementary,
    values,
  };
};

module.exports.manifest = require("./manifest");