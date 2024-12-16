const { pipeline } = require("stream/promises");

const { parse } = require("csv");

const { Datatable } = require("../../types/datatable.js");

module.exports = async function (args) {
  const datatableWriter = await Datatable.create();

  let data;

  if (
    args.encoding === "utf8"
    &&
    args.newline === "\n"
    &&
    args.delimiter === ","
    &&
    args.trim === true
    &&
    !args["column names"]
  ) {
    data = new Datatable(args.file.getSource());
  }
  else {
    await pipeline(
      args.file.getReader({ encoding: args.encoding }),
      parse({
        columns: (
          args["column names"]
            ?
            args["column names"]
            :
            (headerCells) => headerCells.map((column) => column.trim())
        ),
        record_delimiter: args.newline,
        delimiter: args.delimiter,
        trim: args.trim,
      }),
      datatableWriter,
    );

    data = await datatableWriter.finalise();
  }

  const columns = await data.getColumns();
  for (let index = 0; index < columns.length; index++) {
    if (!columns[index]) {
      throw new Error(`Datatable includes a column without a name at index ${index + 1}`);
    }
  }

  return { data };
};

module.exports.manifest = require("./manifest.js");
