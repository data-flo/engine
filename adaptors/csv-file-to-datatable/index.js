const { parse } = require("csv");

const { Datatable } = require("../../types/datatable");

module.exports = async function (args) {
  // const data = new Datatable(
  //   {
  //     streamGetter: args.csv,
  //     parserOptions: {
  //       delimiter: args.delimiter,
  //       encoding: args.encoding,
  //     },
  //   }
  // );

  const datatableWriter = await Datatable.create({ columns: args.columns });

  args.csv.getReader()
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
