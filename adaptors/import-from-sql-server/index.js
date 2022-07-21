const { Datatable } = require("../../types/datatable");

const queryDatabase = require("../../utils/data/query-database");

module.exports = async function (args) {
  const client = "mssql";
  const connection = {
    host: args.hostname,
    port: args.port,
    user: args.username,
    password: args.password,
    database: args.database,
    options: {
      encrypt: true,
    },
  };

  const stream = queryDatabase(
    client,
    connection,
    args.query,
  );

  const data = await Datatable.createFromAsyncIterable(stream);

  return { data };
};

module.exports.manifest = require("./manifest");
