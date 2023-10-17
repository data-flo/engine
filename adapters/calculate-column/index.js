const { EmptyString } = require("../../utils/constants/index.js");

const functions = {
  "add": (a, b) => a + b,
  "subtract": (a, b) => a - b,
  "multiply": (a, b) => a * b,
  "divide": (a, b) => a / b,
  "percent": (a, b) => (a / b) * 100,
  "exponent": (a, b) => a ** b,
};

module.exports = async function (args) {
  await args.data.shouldIncludeColumns(
    args["left column"],
    args["right column"],
  );

  const operationFunction = functions[args["operation"]];

  const resultUnit = args["result unit"];

  const data = await args.data.addColumnSync(
    args["result column"],
    (row) => {
      const leftValue = parseFloat(row[args["left column"]]);
      const rightValue = parseFloat(row[args["right column"]]);
      if (Number.isFinite(leftValue) && Number.isFinite(rightValue)) {
        const result = operationFunction(leftValue, rightValue);
        if (resultUnit) {
          return `${result}${resultUnit}`;
        }
        else {
          return result;
        }
      }
      else {
        return EmptyString;
      }
    },
  );

  return { data };
};

module.exports.manifest = require("./manifest.js");
