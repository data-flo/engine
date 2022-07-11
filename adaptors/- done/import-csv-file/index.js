const { parse } = require("csv");

const { Datatable } = require("../../types/datatable");

module.exports = async function (args) {
  const datatableWriter = await Datatable.create();

  const columns = (
    args.columns
      ?
      args.columns
      :
      (headerCells) => headerCells.map((column) => column.trim())
  );

  args.file.getReader({ encoding: args.encoding })
    .pipe(
      parse({
        trim: args.trim,
        columns,
      })
    )
    .pipe(
      datatableWriter
    );

  const data = await datatableWriter.finalise();

  return {
    data,
  };
};

module.exports.manifest = require("./manifest");
