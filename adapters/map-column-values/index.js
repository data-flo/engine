const CaseInsensitiveMap = require("../../utils/structures/case-insensitive-map");
const { EmptyString } = require("../../utils/constants");

module.exports = async function mapColumnValues(args) {
  await args.data.shouldIncludeColumns(args["original column"]);

  const newColumnName = args["new column"] || args["original column"];
  if (newColumnName !== args["original column"]) {
    await args.data.shouldExcludeColumns(newColumnName);
  }

  const valuesMap = args["case sensitive"] ? args.values : new CaseInsensitiveMap(args.values);

  const data = await args.data.transformSync(
    (row) => {
      const originalValue = row[args["original column"]];
      const mappedValue = valuesMap.get(originalValue);
      if (mappedValue !== undefined) {
        row[newColumnName] = mappedValue ?? EmptyString;
      }
      else {
        if (args["unmapped values"] === "include") {
          row[newColumnName] = originalValue;
        }
        if (args["unmapped values"] === "blank") {
          row[newColumnName] = EmptyString;
        }
      }
      return row;
    }
  );

  return { data };
};

module.exports.manifest = require("./manifest");
