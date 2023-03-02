const fromString = require("../../utils/date/from-string");
const difference = require("../../utils/date/difference");

const { EmptyString } = require("../../utils/constants");

module.exports = async function (args) {
  await args.data.shouldIncludeColumns(
    args["column one"],
    args["column two"],
  );

  const data = await args.data.addColumnSync(
    args["difference column"],
    (row) => {
      const referenceDate = fromString(
        row[args["column one"]],
        args["column one format"],
      );
      const valueDate = fromString(
        row[args["column two"]],
        args["column two format"],
      );

      if (referenceDate && valueDate) {
        const diff = difference(
          referenceDate,
          valueDate,
          args["difference unit"]
        );
        return diff;
      }
      else {
        return EmptyString;
      }
    },
  );

  return { data };
};

module.exports.manifest = require("./manifest");
