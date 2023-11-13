const makePredicate = require("../../utils/expressions/make-predicate.js");

const createTextNormaliser = require("../../utils/text/create-text-normaliser.js");

module.exports = function (args) {
  const textNormaliser = createTextNormaliser(
    false,
    args["match diacritics"],
  );
  const predicate = makePredicate(
    args["filter type"],
    args["filter value"],
    args["match case"],
  );

  const values = [];
  const complementary = [];
  for (const item of args.list) {
    const condition = predicate(textNormaliser(item));
    if (condition) {
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
