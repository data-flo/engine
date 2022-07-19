const makeRegexp = require("../../utils/text/make-regexp");

module.exports = async function (args) {
  await args.data.shouldIncludeColumns(args.source);

  const regex = makeRegexp(args.separator, true, true);

  const data = await args.data.transformSync(
    (row, { records }) => {
      if (records === 1) {
        for (const column of args.columns) {
          row[column] = "";
        }
      }
      const value = row[args.source];
      if (value) {
        const splits = value.toString().split(regex);
        for (let index = 0; index < args.columns.length && index < splits.length; index++) {
          row[args.columns[index]] = splits[index];
        }
      }
      return row;
    }
  );

  return { data };
};

module.exports.manifest = require("./manifest");
