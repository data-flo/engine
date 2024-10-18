const CaseInsensitiveMap = require("../../utils/structures/case-insensitive-map.js");
const { EmptyString } = require("../../utils/constants/index.js");

module.exports = async function mapColumnValues(args) {
  // Check for existing columns
  const existing = [];
  const nonExisting = [];
  for (const [sourceCol, targetCol] of args["columns"].entries()) {
    existing.push(sourceCol);
    if (targetCol) {
      nonExisting.push(targetCol);
    }
  }
  await args.data.shouldIncludeColumns(...existing);
  if (nonExisting.length) {
    await args.data.shouldExcludeColumns(...nonExisting);
  }

  const valuesMap = args["case sensitive"] ? args.values : new CaseInsensitiveMap(args.values);

  const data = await args.data.transformSync(
    (row) => {
      for (const [sourceCol, targetColOrEmpty] of args["columns"].entries()) {
        const targetCol = targetColOrEmpty || sourceCol;
        const originalValue = row[sourceCol];
        const mappedValue = valuesMap.get(originalValue);
        if (mappedValue !== undefined) {
          row[targetCol] = mappedValue ?? EmptyString;
        }
        else {
          if (args["unmapped values"] === "include") {
            row[targetCol] = originalValue;
          }
          if (args["unmapped values"] === "blank") {
            row[targetCol] = EmptyString;
          }
        }
      }
      return row;
    }
  );

  return { data };
};

module.exports.manifest = require("./manifest.js");
