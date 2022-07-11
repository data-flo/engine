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
