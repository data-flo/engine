const assert = require("node:assert");
const test = require("node:test");

const { compareFile } = require("../../../utils/testing/unit.js");
const createTmpTextFile = require("../../../utils/file/tmp-text.js");
const createDatatable = require("../../../types/datatable.js");
const runAdaptor = require("../../../runner/run-adaptor.js");

const adaptor = require("../index.js");

test("jittering adaptor", async (t) => {
  const testCsvFilePath = await createTmpTextFile(`"id","age"
"Bovine","4"
"Gibbon","19"
"Orangutan","14"
"Gorilla","20"
"Human","2"
"Mouse","3"
`);
  await t.test("given a datatable a range of 1 and a digit of 0, it should add jittering to a column", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "data": createDatatable(testCsvFilePath),
        "columns": [ "age" ],
        "range": 1,
        "digits": 0,
      },
    );
    assert.ok(output.data);
    for await (const row of output.data.getReader()) {
      assert.ok((row.age - 1) <= row.age <= (row.age + 1));
    }
  });

  await t.test("given range set to 0, it should return the same datatable", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "data": createDatatable(testCsvFilePath),
        "columns": [ "age" ],
        "range": 0,
        "digits": 0,
      },
    );
    assert.ok(output.data);
    compareFile(
      output.data.getSource(),
      `"id","age"
"Bovine","4"
"Gibbon","19"
"Orangutan","14"
"Gorilla","20"
"Human","2"
"Mouse","3"
`
    );
  });

});
