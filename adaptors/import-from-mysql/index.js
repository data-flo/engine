import { Datatable }  from "../../types/datatable";
import queryDatabase  from "../../utils/databases/query";



export default async function (args) {
  const client = "mysql";
  const connection = {
    host: args.hostname,
    port: args.port,
    user: args.username,
    password: args.password,
    database: args.database,
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
