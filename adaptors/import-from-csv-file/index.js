import { parse } from "csv";
import { Datatable } from "../../types/datatable";

export default async function (args) {
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
        record_delimiter: args.newline,
        delimiter: args.delimiter,
        trim: args.trim,
      })
    )
    .pipe(
      datatableWriter
    );

  const data = await datatableWriter.finalise();

  return { data };
}

export { default as manifest } from "./manifest";
