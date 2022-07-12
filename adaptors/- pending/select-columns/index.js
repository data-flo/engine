//       for (const columnName of args.columns) {
module.exports = async function (args) {
  const data = await args.data.clone(args.columns);
  return { data };
};

module.exports.manifest = require("./manifest");
