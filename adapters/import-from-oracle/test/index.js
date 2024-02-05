const test = require("node:test");
const assert = require("node:assert");
const path = require("path");

const { compareFile, setupServices } = require("../../../utils/testing/unit.js");
const runAdaptor = require("../../../runner/run-adaptor.js");

const adaptor = require("../index.js");

test("import-from-oracle adaptor", async (t) => {
  setupServices(path.resolve(__dirname));

  await t.test("given a query, it should return a datatable with 3 rows", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "connection string": "localhost:1521/FREE",
        "username": "system",
        "password": "Test123",
        "query": `
          SELECT * FROM (SELECT 1 AS FIELD1, 'a' AS FIELD2 FROM all_tables FETCH FIRST 1 ROWS ONLY)
          UNION
          SELECT * FROM (SELECT 2 AS FIELD1, 'b' AS FIELD2 FROM all_tables FETCH FIRST 1 ROWS ONLY)
          UNION
          SELECT * FROM (SELECT 3 AS FIELD1, 'c' AS FIELD2 FROM all_tables FETCH FIRST 1 ROWS ONLY)
        `,
      },
    );
    assert.ok(output.data, "adaptor should return data");
    compareFile(
      output.data.getSource(),
      `"FIELD1","FIELD2"
"1","a"
"2","b"
"3","c"
`
    );
  });

});
