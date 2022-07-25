module.exports = async function (args) {
  const data = await args.data.clone(args["column names"]);
  return { data };
};

module.exports.manifest = require("./manifest");
