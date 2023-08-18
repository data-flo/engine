/* eslint no-restricted-globals: 0 */

const fromString = require("../../utils/date/from-string");
const toString = require("../../utils/date/to-string");

const { EmptyString } = require("../../utils/constants");

module.exports = async function (args) {
  await args.data.shouldIncludeColumns(
    args["original column name"],
  );

  const newColumnName = args["new column name"] || args["original column name"];

  const operationFunction = (
    args["original column name"] === newColumnName
      ?
      "modifyColumnSync"
      :
      "addColumnSync"
  );

  const data = await args.data[operationFunction](
    newColumnName,
    (row) => {
      const originalDate = fromString(
        row[args["original column name"]],
        args["original format"],
        args["original locale"],
      );
      if (originalDate) {
        return toString(
          originalDate,
          args["new format"],
          args["new locale"],
        );
      }
      else {
        return EmptyString;
      }
    },
  );

  return { data };
};

module.exports.manifest = require("./manifest.js");
