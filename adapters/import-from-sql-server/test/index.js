const test = require("node:test");
const assert = require("node:assert");
const path = require("path");
const { compareFile, setupServices } = require("../../../utils/testing/unit.js");

const adaptor = require("../index.js");

const baseArgs = {
  "hostname": "localhost",
  "port": 1433,
  "username": "sa",
  "password": "fPaKMc56_",
  "database": "master",
  "query": `
          SELECT 1 AS field1, 'a' AS field2
          UNION
          SELECT 2 AS field1, 'b' AS field2
          UNION
          SELECT 3 AS field1, 'c' AS field2
        `,
};
test("import-from-sql-server adaptor", async (t) => {
  setupServices(path.resolve(__dirname));

  await t.test("given a query, it should return a datatable with 3 rows", async () => {
    const output = await adaptor(baseArgs);
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
  await t.test("given an invalid port, it should throw an error", async () => {
    await assert.rejects(
      adaptor({
        ...baseArgs,
        "port": "9999",
      }),
      {
        name: "ConnectionError",
        message: "Failed to connect to localhost:9999 - Could not connect (sequence)",
      }
    );
  });
});
