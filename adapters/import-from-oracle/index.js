const oracledb = require("oracledb");

const { Datatable } = require("../../types/datatable.js");

module.exports = async function (args) {
  const connection = await oracledb.getConnection({
    user: args.username,
    password: args.password,
    connectString: args["connection string"],
    externalAuth: false,
  });

  // https://node-oracledb.readthedocs.io/en/latest/user_guide/sql_execution.html
  const result = await connection.execute(
    args.query,
    {}, // binds
    {
      resultSet: true,
      outFormat: oracledb.OUT_FORMAT_OBJECT,
    },
  );

  const datatableWriter = await Datatable.create();

  const rs = result.resultSet;
  let rows;
  const batchSize = 100;
  do {
    rows = await rs.getRows(batchSize);
    for (const row of rows) {
      datatableWriter.write(row);
    }
  } while (rows.length === batchSize);

  datatableWriter.end();

  await rs.close();
  await connection.close();

  const data = await datatableWriter.finalise();

  return { data };
};

module.exports.manifest = require("./manifest.js");
