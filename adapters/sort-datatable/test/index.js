const test = require("node:test");
const assert = require("node:assert");

const { compareFile } = require("../../../utils/testing/unit.js");

const runAdaptor = require("../../../runner/run-adaptor.js");
const createTmpTextFile = require("../../../utils/file/tmp-text.js");
const createDatatable = require("../../../types/datatable.js");

const adaptor = require("../index.js");

test("select-rows adaptor", async (t) => {
  const testCsvFilePath = await createTmpTextFile(`"id","Country","empty","date a","date b"
"Human","gb",,,
"Gibbon","fr",,,
"Orangutan",,,,
"Gorilla",,,,
"Mouse","gb",,,
"Bovine","de",,"Jan 29, 2007","2007-01-28"
`);

  await t.test("given a datatable and one column, it should return a datatable", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "data": createDatatable(testCsvFilePath),
        "column names": [
          [ "id", "asc" ],
        ],
      },
    );
    assert.ok(output.data, "adaptor should return data");
    compareFile(
      output.data.getSource(),
      `"id","Country","empty","date a","date b"
"Bovine","de",,"Jan 29, 2007","2007-01-28"
"Gibbon","fr",,,
"Gorilla",,,,
"Human","gb",,,
"Mouse","gb",,,
"Orangutan",,,,
`
    );
  });

  await t.test("given a datatable and two columns, it should return a datatable", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "data": createDatatable(testCsvFilePath),
        "column names": [
          [ "Country", "asc" ],
          [ "id", "desc" ],
        ],
      },
    );
    assert.ok(output.data, "adaptor should return data");
    compareFile(
      output.data.getSource(),
      `"id","Country","empty","date a","date b"
"Orangutan",,,,
"Gorilla",,,,
"Bovine","de",,"Jan 29, 2007","2007-01-28"
"Gibbon","fr",,,
"Mouse","gb",,,
"Human","gb",,,
`
    );
  });

  await t.test("given a datatable and two columns, it should return a datatable", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "data": createDatatable(testCsvFilePath),
        "column names": [
          [ "id", "desc" ],
          [ "Country", "asc" ],
        ],
      },
    );
    assert.ok(output.data, "adaptor should return data");
    compareFile(
      output.data.getSource(),
      `"id","Country","empty","date a","date b"
"Orangutan",,,,
"Mouse","gb",,,
"Human","gb",,,
"Gorilla",,,,
"Gibbon","fr",,,
"Bovine","de",,"Jan 29, 2007","2007-01-28"
`
    );
  });

});
