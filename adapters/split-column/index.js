const makeRegexp = require("../../utils/text/make-regexp.js");

module.exports = async function (args) {
  await args.data.shouldIncludeColumns(args["column name"]);

  const columns = await args.data.getColumns();
  for (const column of args["new column names"]) {
    columns.push(column);
  }

  if (!args["include column"]) {
    columns.splice(columns.indexOf(args["column name"]), 1);
  }

  const regex = makeRegexp(args.separator, true, true);

  const data = await args.data.transformSync(
    (row) => {
      const value = row[args["column name"]];
      if (value) {
        const splits = value.toString().split(regex);
        for (let index = 0; index < args["new column names"].length && index < splits.length; index++) {
          row[args["new column names"][index]] = splits[index];
        }
      }
      return row;
    },
    {
      columns,
    },
  );

  return { data };
};

module.exports.manifest = require("./manifest.js");
