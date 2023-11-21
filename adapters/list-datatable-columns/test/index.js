const test = require("node:test");
const assert = require("node:assert");

const { compareFile } = require("../../../utils/testing/unit.js");
const createTmpTextFile = require("../../../utils/file/tmp-text.js");
const createDatatable = require("../../../types/datatable.js");
const runAdaptor = require("../../../runner/run-adaptor.js");

const adaptor = require("../index.js");

test("list-datatable-columns adaptor", async (t) => {
  const testCsvFilePath = await createTmpTextFile(`"id","Country","empty","date a","date b"
"Bovine","de",,"Jan 29, 2007","2007-01-28"
"Gibbon","fr",,,
"Orangutan",,,,
"Gorilla",,,,
"Human","gb",,,
"Mouse","gb",,,
`);

  await t.test("given a datatable, it should return a csv file", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        data: createDatatable(testCsvFilePath),
      },
    );
    assert.ok(output["column names"], "adaptor should return column names");
    const actual = output["column names"];
    const expected = [ "id", "Country", "empty", "date a", "date b" ];
    assert.deepEqual(actual, expected);
  });

});
