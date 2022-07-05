const fromString = require("../../utils/date/from-string");
const difference = require("../../utils/date/difference");

module.exports = async function (args) {
  //TODO: error when difference column
  const data = await args.data.transform(
    (row) => {
      const referenceDate = fromString(
        row[args["reference column"]],
        args["reference format"],
      );
      const valueDate = fromString(
        row[args["value column"]],
        args["value format"],
      );

      if (referenceDate && valueDate) {
        row["target column"] = difference(
          referenceDate,
          valueDate,
          args["difference unit"]
        );
      }
      else {
        row["target column"] = EmptyString;
      }

      return row;
    }
  );

  return { data };
};
