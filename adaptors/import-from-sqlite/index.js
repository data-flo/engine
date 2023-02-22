import { Datatable }  from "../../types/datatable";
import queryDatabase  from "../../utils/databases/query";



export default async function (args) {
  const client = "sqlite3";
  const connection = {
    filename: args["sqlite file"].getSource(),
  };

  const stream = queryDatabase(
    client,
    connection,
    args.query,
  );

  const data = await Datatable.createFromAsyncIterable(stream);

  return { data };
};

export { default as manifest } from "./manifest";
