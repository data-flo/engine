const test = require("node:test");
const assert = require("node:assert");

const { compareFile } = require("../../../utils/testing/unit.js");

const createFile = require("../../../types/file.js");
const tmpFilePath = require("../../../utils/file/tmp-path.js");

const adaptor = require("../index.js");

test("import-from-sqlite adaptor", async (t) => {
  const filePath = await tmpFilePath();

  await t.test("given a query, it should return a datatable with 3 rows", async () => {
    const output = await adaptor(
      {
        "sqlite file": createFile(filePath),
        "query": `
          SELECT 1 AS field1, 'a' AS field2
          UNION
          SELECT 2 AS field1, 'b' AS field2
          UNION
          SELECT 3 AS field1, 'c' AS field2
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

});
