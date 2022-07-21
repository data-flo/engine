const path = require("path");
const tap = require("../../utils/testing/unit");

const runAdaptor = require("../../runner/run-adaptor");
const createFile = require("../../types/file");

const adaptor = require("./index");

tap.test("import-from-sql-server adaptor", async () => {

  tap.test("given a query, it should a datatable with 3 rows", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "sqlite file": createFile(path.join(process.env.HOME, "Downloads", "chinook.db")),
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
