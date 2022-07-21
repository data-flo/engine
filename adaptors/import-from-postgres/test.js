/*
docker run \
  --rm \
  --name postgres \
  --env POSTGRES_PASSWORD=postgres \
  --env POSTGRES_USER=postgres \
  --publish 5432:5432 \
  postgres
*/

const tap = require("../../utils/testing/unit");

const runAdaptor = require("../../runner/run-adaptor");

const adaptor = require("./index");

tap.test("import-from-postgres adaptor", async () => {

  tap.test("given a query, it should a datatable with 3 rows", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "hostname": "localhost",
        "username": "postgres",
        "password": "postgres",
        "database": "postgres",
        "query": `
          SELECT * FROM (
            SELECT 1 AS field1, 'a' AS field2
            UNION
            SELECT 2 AS field1, 'b' AS field2
            UNION
            SELECT 3 AS field1, 'c' AS field2
          ) as x
          Order by field1
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
