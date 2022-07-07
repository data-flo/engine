module.exports = function createDatatable(args) {
  return {
    columns: args.data.columns,
  };
};

module.exports.manifest = require("./manifest");
