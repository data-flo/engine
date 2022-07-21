/*
docker run \
  --rm \
  --name mysql \
  --env MYSQL_ALLOW_EMPTY_PASSWORD=yes \
  --env MYSQL_ROOT_PASSWORD="root" \
  --publish 3306:3306 \
  mysql:5
*/

const tap = require("../../utils/testing/unit");

const runAdaptor = require("../../runner/run-adaptor");

const adaptor = require("./index");

tap.test("import-from-mysql adaptor", async () => {

  tap.test("given a datatable and positive begin and end row numbers, it should a datatable with 2 rows", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "host": "localhost",
        "port": 3306,
        "username": "root",
        "password": "root",
        "database": "sys",
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
