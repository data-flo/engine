const radEarth = 6378.16;
const oneDegree = (2 * Math.PI * radEarth) / 360;
const oneKM = 1 / oneDegree;

// https://gist.github.com/michiel/7984227
function randomInRange(from, to, fixed) {
  return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
}

function addNoise(
  value,
  kms,
  digits,
) {
  return randomInRange(
    value - (kms * oneKM),
    value + (kms * oneKM),
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
            args.kms,
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
