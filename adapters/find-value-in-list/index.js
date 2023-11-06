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

  const index = args.list.findIndex((item) => regexp.test(textNormaliser(item)));
  return {
    value: (index >= 0) ? args.list[index] : null,
    index: (index >= 0) ? index + 1 : null,
  };
};

module.exports.manifest = require("./manifest.js");
