const { parse } = require("csv");

const { Datatable } = require("../../types/datatable.js");

module.exports = async function (args) {
  const datatableWriter = await Datatable.create();

  const columns = (
    args.columns
      ?
      args.columns
      :
      (headerCells) => headerCells.map((column) => column.trim())
  );

  parse(
    args.csv,
    {
      delimiter: args.delimiter,
      columns,
      trim: args.trim,
    },
  )
    .pipe(
      datatableWriter
    );

  const data = await datatableWriter.finalise();

  return { data };
};

module.exports.manifest = require("./manifest.js");
