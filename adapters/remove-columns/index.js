module.exports = async function (args) {
  const columnsToKeep = (
    (await args.data.getColumns())
      .filter((x) => !args.columns.includes(x))
  );

  const data = await args.data.clone(columnsToKeep);

  return { data };
};

module.exports.manifest = require("./manifest");
