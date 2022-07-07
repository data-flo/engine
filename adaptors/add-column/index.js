module.exports = async function (args) {
  const data = await args.data.addColumnSync(
    args.column,
    () => args.value ?? "",
  );

  return { data };
};

module.exports.manifest = require("./manifest");
