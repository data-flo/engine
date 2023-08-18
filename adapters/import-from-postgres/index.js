const { Datatable } = require("../../types/datatable");

const queryDatabase = require("../../utils/databases/query");

module.exports = async function (args) {
  const client = "pg";
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

module.exports.manifest = require("./manifest.js");
