const makePredicate = require("../../utils/expressions/make-predicate.js");

const createTextNormaliser = require("../../utils/text/create-text-normaliser.js");

module.exports = function (args) {
  const textNormaliser = createTextNormaliser(
    true,
    args["match diacritics"],
  );

  const predicate = makePredicate(
    args["filter type"],
    textNormaliser(args["filter value"]),
    args["case sensitive"],
  );

  const values = [];
  const complementary = [];
  for (const item of args.list) {
    const value = predicate(textNormaliser(item));
    if (value) {
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
