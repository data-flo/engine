module.exports = async function (args) {
  await args.data.shouldExcludeColumns(...args["column names"]);

  const data = await args.data.transformSync(
    (row, context) => {
      for (const columnName of args["column names"]) {
        row[columnName] = args.value ?? "";
      }
      return row;
    },
  );

  return { data };
};

module.exports.manifest = require("./manifest.js");
