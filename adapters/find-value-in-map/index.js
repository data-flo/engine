const createTextNormaliser = require("../../utils/text/create-text-normaliser.js");

module.exports = function (args) {
  const textNormaliser = createTextNormaliser(
    args["match case"],
    args["match diacritics"],
  );

  if (args["match case"] || args["match diacritics"]) {
    const queryKey = textNormaliser(args.key);
    for (const [key, value] of args.map.entries()) {
      if (queryKey === textNormaliser(key)) {
        return {
          "value": value,
        };
      }
    }
  }
  else if (args.map.has(args.key)) {
    return {
      value: args.map.get(args.key),
    };
  }

  return {
    value: args["default value"],
  };
};

module.exports.manifest = require("./manifest.js");
