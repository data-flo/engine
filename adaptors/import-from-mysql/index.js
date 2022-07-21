const knex = require("knex");

const { Datatable } = require("../../types/datatable");

module.exports = async function (args) {
  const instance = knex({
    client: "mysql",
    connection: {
      host: args.hostname,
      port: args.port,
      user: args.username,
      password: args.password,
      database: args.database,
    },
  });
  if (!/^\s*SELECT/i.test(args.query)) {
    throw new Error("Invalid SQL Query: query should start with a SELECT statement.");
  }

  const dataWriter = await Datatable.create();

  const result = await instance.raw(args.query);
  instance.destroy();

  const rows = result[0];

  for await (const row of rows) {
    dataWriter.write(row);
  }

  dataWriter.end();

  const data = await dataWriter.finalise();

  return { data };
};

module.exports.manifest = require("./manifest");
