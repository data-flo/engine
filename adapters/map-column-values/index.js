// const CaseInsensitiveMap = require("../../utils/structures/case-insensitive-map.js");
const { EmptyString } = require("../../utils/constants/index.js");

const makeRegexp = require("../../utils/text/make-regexp.js");
const isRegexp = require("../../utils/text/is-regexp.js");

// function findPattern(
//   valuesMapping,
//   originalValue,
//   caseSensitive,
// ) {
//   for (const [ pattern, replacement ] of valuesMapping) {
//     if (originalValue.match(regex)) {
//       return [ regex, replacement ];
//     }
//   }

//   return undefined;
// }

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

  // const valuesMap = args["case sensitive"] ? args.values : new CaseInsensitiveMap(args.values);

  const valuesMapping = [];

  for (const [key, value] of args.values) {
    if (isRegexp(key)) {
      const regex = makeRegexp(
        key,
        args["case sensitive"],
      );
      valuesMapping.push([ regex, value ]);
    }
    else {
      valuesMapping.push([ key, value ]);
    }
  }

  const sensitivity = (!args["case sensitive"]) ? "base" : undefined;

  const data = await args.data.transformSync(
    (row) => {
      for (const [sourceCol, targetColOrEmpty] of args["columns"].entries()) {
        const targetCol = targetColOrEmpty || sourceCol;
        const originalValue = row[sourceCol] ?? "";
        if (args["unmapped values"] === "include") {
          row[targetCol] = originalValue;
        }
        if (args["unmapped values"] === "blank") {
          row[targetCol] = EmptyString;
        }

        for (const [ pattern, replacement ] of valuesMapping) {
          if (
            typeof pattern === "string"
          ) {
            if (sensitivity) {
              if (originalValue.toString().localeCompare(pattern, undefined, { sensitivity }) === 0) {
                row[targetCol] = replacement;
              }
            }
            else if (originalValue.toString() === pattern) {
              row[targetCol] = replacement;
            }
          }
          else if (originalValue.match(pattern)) {
            row[targetCol] = replacement ?? EmptyString;
          }
        }
      }
      return row;
    }
  );

  return { data };
};

module.exports.manifest = require("./manifest.js");
