module.exports = function (args) {
  const keyColumn = args.data.getColumn(args["key column"]);
  const valueColumn = args.data.getColumn(args["value column"]);
  const dictionary = new Map();

  for (const row of args.data.rows) {
    if (keyColumn in row) {
      dictionary.set(row[keyColumn], row[valueColumn]);
    }
  }

  return {
    map: dictionary,
  };
};

module.exports = async function (args) {
  await args.data.shouldIncludeColumns(args["column name"]);

  const list = [];

  for await (const row of args.data.getReader([ args["column name"] ])) {
    const value = row[args["column name"]];
    if (value !== null && value !== undefined && value !== "") {
      list.push(value);
    }
  }

  return { list };
};

module.exports.manifest = require("./manifest");
