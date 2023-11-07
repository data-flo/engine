const makeRegexp = require("../../utils/text/make-regexp.js");

const createTextNormaliser = require("../../utils/text/create-text-normaliser.js");

module.exports = function (args) {
  const textNormaliser = createTextNormaliser(
    false,
    args["match diacritics"],
  );

  const regexp = makeRegexp(
    textNormaliser(args.pattern),
    args["match case"],
  );

  const values = [];
  const complementary = [];
  for (const item of args.list) {
    if (regexp.test(textNormaliser(item))) {
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

module.exports.manifest = require("./manifest.js");
