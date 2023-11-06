const fromString = require("../../utils/date/from-string.js");
const difference = require("../../utils/date/difference.js");

const { EmptyString } = require("../../utils/constants/index.js");

module.exports = async function (args) {
  console.error(args)
  await args.data.shouldIncludeColumns(
    args["column one"],
    args["column two"],
  );

  const data = await args.data.addColumnSync(
    args["difference column"],
    (row, context) => {
      if (row[args["column one"]] && row[args["column two"]]) {
        const referenceDate = fromString(
          row[args["column one"]],
          args["column one format"],
        );

        if (!referenceDate) {
          throw new Error(`Value ${row[args["column one"]]} (Row ${context.records} Column ${args["column one"]}) is not in ${args["column one format"]} format.`);
        }

        const valueDate = fromString(
          row[args["column two"]],
          args["column two format"],
        );

        if (!valueDate) {
          throw new Error(`Value ${row[args["column two"]]} (Row ${context.records} Column ${args["column two"]}) is not in ${args["column two format"]} format.`);
        }

        if (referenceDate && valueDate) {
          const diff = difference(
            referenceDate,
            valueDate,
            args["difference unit"]
          );
          return diff;
        }
      }

      return EmptyString;
    },
  );

  return { data };
};

module.exports.manifest = require("./manifest.js");
