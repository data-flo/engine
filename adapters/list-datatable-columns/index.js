module.exports = async function createDatatable(args) {
  const columns = await args.data.getColumns();
  return { "column names": columns };
};

module.exports.manifest = require("./manifest");
