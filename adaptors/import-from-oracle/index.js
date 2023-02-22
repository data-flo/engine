import { Datatable }  from "../../types/datatable";
import queryDatabase  from "../../utils/databases/query";



/*
const path = require("path");
const oracledb = require("oracledb");
// On Windows and macOS, you can specify the directory containing the Oracle
// Client Libraries at runtime, or before Node.js starts.  On other platforms
// the system library search path must always be set before Node.js is started.
// See the node-oracledb installation documentation.
// If the search path is not correct, you will get a DPI-1047 error.
if (process.platform === "win32") { // Windows
  oracledb.initOracleClient({ libDir: "C:\\oracle\\instantclient_19_11" });
}
else if (process.platform === "darwin") { // macOS
  oracledb.initOracleClient({ libDir: path.join(process.env.HOME, "/Downloads/instantclient_19_8") });
}
*/

export default async function (args) {
  const client = "oracledb";
  const connection = {
    user: args.username,
    password: args.password,
    connectString: args["connection string"],
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
