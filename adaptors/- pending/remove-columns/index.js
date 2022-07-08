const { Datatable } = require("../../types/datatable");

module.exports = async function (args) {
  const columnsToKeep = (
    (await args.data.getColumns())
      .filter((x) => !args.columns.includes(x))
  );

  const datatableWriter = await Datatable.create();
  args.data.getPartialReader(columnsToKeep)
    .pipe(datatableWriter);

  const data = await datatableWriter.finalise();

  return {
    data,
  };
};

module.exports.manifest = require("./manifest");
