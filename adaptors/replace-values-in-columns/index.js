const makeRegexp = require("../../utils/text/make-regexp");

module.exports = async function (args) {
  await args.data.shouldIncludeColumns(Array.from(args.columns.keys));

  const regex = makeRegexp(args.pattern);

  const data = await args.data.transformSync(
    (row) => {
      for (const [ sourceColumn, targetColumn ] of args.columns.entries()) {
        if (typeof row[sourceColumn] === "string") {
          row[targetColumn || sourceColumn] = row[sourceColumn].replace(
            regex,
            args.replacement,
          );
        }
      }

      return row;
    }
  );

  return { data };
};

module.exports.manifest = require("./manifest");
