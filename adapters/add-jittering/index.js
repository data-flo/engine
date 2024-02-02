const radEarth = 6378.16;
const oneDegree = (2 * Math.PI * radEarth) / 360;
const oneKM = 1 / oneDegree;
const kilometersInOneMile = 1.60934;

// https://gist.github.com/michiel/7984227
function randomInRange(from, to, fixed) {
  return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
}

function normaliseRange(
  range,
  unit,
) {
  if (unit === "none") {
    return range;
  }
  if (unit === "kilometers") {
    return range * oneKM;
  }
  if (unit === "meters") {
    return (range / 1000) * oneKM;
  }
  if (unit === "miles") {
    return range * kilometersInOneMile * oneKM;
  }
  throw new Error("Invalid unit");
}

function addNoise(
  value,
  range,
  unit,
  digits,
) {
  const normalisedRange = normaliseRange(
    range,
    unit,
  )
  return randomInRange(
    value - normalisedRange,
    value + normalisedRange,
    digits,
  );
}

module.exports = async function (args) {

  await args.data.shouldIncludeColumns(args.columns);

  const data = await args.data.transformSync(
    (row) => {
      for (const columnName of args.columns) {
        const value = parseFloat(row[columnName]);
        if (!Number.isNaN(value)) {
          row[columnName] = addNoise(
            value,
            args.range,
            args.unit,
            args.digits,
          );
        }
      }
      return row;
    }
  );

  return { data };
};

module.exports.manifest = require("./manifest.js");
