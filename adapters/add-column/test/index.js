const test = require("node:test");
const assert = require("node:assert");

const { compareFile } = require("../../../utils/testing/unit.js");
const createTmpTextFile = require("../../../utils/file/tmp-text.js");
const createDatatable = require("../../../types/datatable.js");
const runAdaptor = require("../../../runner/run-adaptor.js");

const adaptor = require("../index.js");

test("add-column adaptor", async (t) => {
  const testCsvFilePath = await createTmpTextFile(`"id","Country","empty","date a","date b"
"Bovine","de",,"Jan 29, 2007","2007-01-28"
"Gibbon","fr",,,
"Orangutan",,,,
"Gorilla",,,,
"Human","gb",,,
"Mouse","gb",,,
`);

  await t.test("given a datatable, it should add a column", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "data": createDatatable(testCsvFilePath),
        "column names": ["ones"],
        "value": "1",
      },
    );
    assert.ok(output.data);
    compareFile(
      output.data.getSource(),
      `"id","Country","empty","date a","date b","ones"
"Bovine","de",,"Jan 29, 2007","2007-01-28","1"
"Gibbon","fr",,,,"1"
"Orangutan",,,,,"1"
"Gorilla",,,,,"1"
"Human","gb",,,,"1"
"Mouse","gb",,,,"1"
`,
    );
  });

  await t.test("given a datatable, it should add two columns", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "data": createDatatable(testCsvFilePath),
        "column names": ["ones 1", "ones 2"],
        "value": "1",
      },
    );
    assert.ok(output.data);
    compareFile(
      output.data.getSource(),
      `"id","Country","empty","date a","date b","ones 1","ones 2"
"Bovine","de",,"Jan 29, 2007","2007-01-28","1","1"
"Gibbon","fr",,,,"1","1"
"Orangutan",,,,,"1","1"
"Gorilla",,,,,"1","1"
"Human","gb",,,,"1","1"
"Mouse","gb",,,,"1","1"
`,
    );
  });

  await t.test("given no value, it should add an empty column", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "data": createDatatable(testCsvFilePath),
        "column names": ["ones"],
      },
    );
    assert.ok(output.data);
    compareFile(
      output.data.getSource(),
      `"id","Country","empty","date a","date b","ones"
"Bovine","de",,"Jan 29, 2007","2007-01-28",
"Gibbon","fr",,,,
"Orangutan",,,,,
"Gorilla",,,,,
"Human","gb",,,,
"Mouse","gb",,,,
`,
    );
  });

  await t.test("given an existing column, it should throw an error", async () => {
    await assert.rejects(
      adaptor({
        "data": createDatatable(testCsvFilePath),
        "column names": ["id"],
      }),
      new Error("Datatable already includes a column named id"),
    );
  });

});
