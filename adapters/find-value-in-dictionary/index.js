const createTextNormaliser = require("../../utils/text/create-text-normaliser.js");

module.exports = function (args) {
  if (
    !args["case sensitive"]
    ||
    !args["match diacritics"]
  ) {
    const textNormaliser = createTextNormaliser(
      args["case sensitive"],
      args["match diacritics"],
    );
    const queryKey = textNormaliser(args.key);
    for (const [key, value] of args.dictionary.entries()) {
      if (queryKey === textNormaliser(key)) {
        return {
          "value": value,
        };
      }
    }
  }
  else if (args.dictionary.has(args.key)) {
    return {
      "value": args.dictionary.get(args.key),
    };
  }

  return {
    "value": args["default value"],
  };
};

module.exports.manifest = require("./manifest.js");
