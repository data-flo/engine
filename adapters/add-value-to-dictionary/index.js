const createDictionary = require("../../types/dictionary.js");

module.exports = function (args) {
  const dictionary = args.dictionary || createDictionary();
  if (args.overwrite || !dictionary.has(args.key)) {
    dictionary.set(args.key, args.value);
  }
  return {
    "dictionary": dictionary,
  };
};

module.exports.manifest = require("./manifest.js");
