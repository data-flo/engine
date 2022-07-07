module.exports = async function (args) {
  //TODO: error when column already in data
  const data = await args.data.transformSync(
    (row) => {
      row[args.column] = args.value || "";
      return row;
    },
  );

  return { data };
};

module.exports.manifest = require("./manifest");
