const createDictionary = require("../../types/dictionary.js");

module.exports = async function (args) {
  await args.data.shouldIncludeColumns(
    args["key column"],
    args["value column"],
  );

  const dictionary = createDictionary();

  for await (const row of args.data.getPartialReader([ args["key column"], args["value column"] ])) {
    const key = row[args["key column"]];
    if (key !== null && key !== undefined && key !== "" && !dictionary.has(key)) {
      dictionary.set(
        key,
        row[args["value column"]],
      );
    }
  }

  return {
    "dictionary": dictionary,
  };
};

module.exports.manifest = require("./manifest.js");
