const { Datatable } = require("../../types/datatable.js");

const queryDatabase = require("../../utils/databases/query.js");

module.exports = async function (args) {
  const client = "mysql"; // TODO: This client doesn't work with mysql:8 without a hack (see command in docker file)
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
