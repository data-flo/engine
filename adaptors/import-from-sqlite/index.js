const { Datatable } = require("../../types/datatable");

const queryDatabase = require("../../utils/databases/query");

module.exports = async function (args) {
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

module.exports.manifest = require("./manifest");
