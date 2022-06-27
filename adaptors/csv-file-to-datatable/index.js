const { parse } = require("csv");

const { Datatable } = require("../../types/datatable");

module.exports = async function (args) {
  const datatableWriter = await Datatable.create({ columns: args.columns });

  args.file.getReader({ encoding: args.encoding })
    .pipe(
      parse({
        trim: true,
        columns(headerCells) {
          return headerCells.map((column) => column.trim());
        },
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
