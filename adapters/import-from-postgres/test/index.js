const test = require("node:test");
const assert = require("node:assert");
const path = require("path");

const { compareFile, setupServices } = require("../../../utils/testing/unit.js");
const runAdaptor = require("../../../runner/run-adaptor.js");

const adaptor = require("../index.js");

test("import-from-postgres adaptor", async (t) => {
  setupServices(path.resolve(__dirname));

  await t.test("given a query, it should return a datatable with 3 rows", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "hostname": "localhost",
        "username": "postgres",
        "password": "postgres",
        "database": "postgres",
        "port": "5444",
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
    assert.ok(output.data, "adaptor should return data");
    compareFile(
      output.data.getSource(),
      `"field1","field2"
"1","a"
"2","b"
"3","c"
`
    );
  });

  await t.test("given an invalid port, it should throw an error", { skip: true }, async () => {
    await assert.rejects(
      runAdaptor(
        adaptor,
        {
          "hostname": "localhost",
          "database": "postgres",
          "port": "9999",
          "query": "SELECT 1",
        },
      ),
      {
        name: "Error",
        message: "connect ECONNREFUSED ::1:9999",
      },
    );
  });

});
