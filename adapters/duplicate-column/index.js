module.exports = async function (args) {
  const data = await args.data.addColumnSync(
    args["new column name"],
    (row) => row[args["column name"]],
  );

  return { data };
};

module.exports.manifest = require("./manifest.js");
