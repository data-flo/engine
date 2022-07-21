/*
docker run \
  --rm \
  --name mssql \
  --env ACCEPT_EULA=Y \
  --env SA_PASSWORD=root \
  --publish 1433:1433 \
  mcr.microsoft.com/mssql/server
*/

const tap = require("../../utils/testing/unit");

const runAdaptor = require("../../runner/run-adaptor");

const adaptor = require("./index");

tap.test("import-from-sql-server adaptor", async () => {

  tap.test("given a query, it should a datatable with 3 rows", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "hostname": "localhost",
        "port": 1433,
        "username": "sa",
        "password": "fPaKMc56",
        "database": "master",
        "query": `
          SELECT 1 AS field1, 'a' AS field2
          UNION
          SELECT 2 AS field1, 'b' AS field2
          UNION
          SELECT 3 AS field1, 'c' AS field2
        `,
      },
    );
    tap.ok(output.data, "adaptor should return data");
    tap.compareFile(
      output.data.getSource(),
      `"field1","field2"
"1","a"
"2","b"
"3","c"
`
    );
  });

});
