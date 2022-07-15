const { parse } = require("csv");

const { Datatable } = require("../../types/datatable");

module.exports = async function (args) {
  const datatableWriter = await Datatable.create();

  args.file.getReader({ encoding: args.encoding })
    .pipe(
      parse({
        columns: (
          args["column names"]
            ?
            args["column names"]
            :
            (headerCells) => headerCells.map((column) => column.trim())
        ),
        delimiter: args.delimiter,
        trim: args.trim,
      })
    )
    .pipe(
      datatableWriter
    );

  const data = await datatableWriter.finalise();

  return { data };
};

module.exports.manifest = require("./manifest");
