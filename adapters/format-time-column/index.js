/* eslint no-restricted-globals: 0 */

const { EmptyString } = require("../../utils/constants/index.js");

const toMilliseconds = {
  "years": 3.15576e+7,
  "quarter": 3.15576e+7 / 4,
  "months": 2.6298e+6,
  "weeks": 7 * 24 * 60 * 60 * 1000,
  "days": 24 * 60 * 60 * 1000,
  "hours": 60 * 60 * 1000,
  "minutes": 60 * 1000,
  "seconds": 1000,
  "milliseconds": 1,
};

module.exports = async function (args) {
  await args.data.shouldIncludeColumns(
    args["original column"],
  );

  const newColumnName = args["new column"] || args["original column"];

  const operationFunctionName = (
    args["original column"] === newColumnName
      ?
      "modifyColumnSync"
      :
      "addColumnSync"
  );

  const data = await args.data[operationFunctionName](
    newColumnName,
    (row) => {
      const originalValue = parseFloat(row[args["original column"]]);
      if (Number.isFinite(originalValue)) {
        const millisecondsValue = originalValue * toMilliseconds[args["original unit"]];
        return millisecondsValue / toMilliseconds[args["new unit"]];
      }
      else {
        return EmptyString;
      }
    },
  );

  return { data };
};

module.exports.manifest = require("./manifest.js");
