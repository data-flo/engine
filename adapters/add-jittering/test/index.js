const assert = require("node:assert");
const test = require("node:test");

const { compareFile } = require("../../../utils/testing/unit.js");
const createTmpTextFile = require("../../../utils/file/tmp-text.js");
const createDatatable = require("../../../types/datatable.js");

const adaptor = require("../index.js");

test("jittering adaptor", async (t) => {
  const testCsvFilePath = await createTmpTextFile(`"id","Country","empty","date a","date b", "numbers"
"Bovine","de",,"Jan 29, 2007","2007-01-28", "4"
"Gibbon","fr",,,,"19"
"Orangutan",,,,,"14"
"Gorilla",,,,,"20"
"Human","gb",,,,"2"
"Mouse","gb",,,,"3"
`);
  await t.test("given a datatable  a range of 20 and a digit of 0, it should add jittering to a column", async () => {
    const output = await adaptor({
      "data": createDatatable(testCsvFilePath),
      "columns": "numbers",
      "range": 20,
      "digits": 0,
    });
    assert.ok(output.data);
    compareFile(
      output.data.getSource(),
      `"id","Country","empty","date a","date b","numbers"
"Bovine","de",,"Jan 29, 2007","2007-01-28","4"
"Gibbon","fr",,,,"19"
"Orangutan",,,,,"14"
"Gorilla",,,,,"20"
"Human","gb",,,,"2"
"Mouse","gb",,,,"3"
`,
    );
  });

});
