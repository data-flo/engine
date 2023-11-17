const test = require("node:test");
const assert = require("node:assert");

const { compareFile } = require("../../../utils/testing/unit.js");

const runAdaptor = require("../../../runner/run-adaptor.js");
const createTmpTextFile = require("../../../utils/file/tmp-text.js");
const createDatatable = require("../../../types/datatable.js");

const adaptor = require("../index.js");

test("summarise-datatables adaptor", async (t) => {
  const testCsvFilePath = await createTmpTextFile(`"id","name","country"
"1","Bovine","de"
"2","Gibbon","fr"
"3","Orangutan",
"4","Gorilla",
"5","Human","gb"
"6","Mouse","gb"
`);

  await t.test("given two datatable, it should return a datatable with 4 columns", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "data": createDatatable(testCsvFilePath),
      },
    );
    assert.ok(output.summary, "adaptor should return summary");
    compareFile(
      output.summary.getSource(),
      `"Column","Type","Missing % (out of 6)","Unique values","Mean"
"id","number","0.0% (0)","6","3.5"
"name","string","0.0% (0)","6",
"country","string","33.3% (2)","3",
`,
    );
  });

});
