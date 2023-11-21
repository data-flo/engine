const test = require("node:test");
const assert = require("node:assert");

const { compareFile } = require("../../../utils/testing/unit.js");
const createTmpTextFile = require("../../../utils/file/tmp-text.js");
const createDatatable = require("../../../types/datatable.js");
const runAdaptor = require("../../../runner/run-adaptor.js");

const adaptor = require("../index.js");

test("duplicate-column adaptor", async (t) => {
  const testCsvFilePath = await createTmpTextFile(`"id","Country"
"Bovine","de"
"Gibbon","fr"
"Orangutan",
"Gorilla",
"Human","gb"
"Mouse","gb"
`);

  await t.test("given a column in a datatable, it should return a datatable with the duplicated column", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "data": createDatatable(testCsvFilePath),
        "column name": "id",
        "new column name": "id copy",
      },
    );
    assert.ok(output.data, "adaptor should return data");
    compareFile(
      output.data.getSource(),
      `"id","Country","id copy"\n"Bovine","de","Bovine"\n"Gibbon","fr","Gibbon"\n"Orangutan",,"Orangutan"\n"Gorilla",,"Gorilla"\n"Human","gb","Human"\n"Mouse","gb","Mouse"\n`,
    );
  });

});
