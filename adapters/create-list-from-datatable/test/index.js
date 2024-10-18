const test = require("node:test");
const assert = require("node:assert");

const createTmpTextFile = require("../../../utils/file/tmp-text.js");
const createDatatable = require("../../../types/datatable.js");
const runAdaptor = require("../../../runner/run-adaptor.js");

const adaptor = require("../index.js");

test("create-list-from-datatable adaptor", async (t) => {
  const testCsvFilePath = await createTmpTextFile(`"id","Country","empty","date a","date b"
"Bovine","de",,"Jan 29, 2007","2007-01-28"
"Gibbon","fr",,,
"Orangutan",,,,
"Gorilla",,,,
"Human","gb",,,
"Mouse","gb",,,
`);

  await t.test("given a column in a datatable, it should return a list of the column values", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "data": createDatatable(testCsvFilePath),
        "column name": "id",
      },
    );
    assert.ok(output.list, "adaptor should return list");
    const actual = output.list;
    const expected = [ "Bovine", "Gibbon", "Orangutan", "Gorilla", "Human", "Mouse" ];
    assert.deepEqual(actual, expected);
  });

  await t.test("given a column in a datatable, it should return a list of the column values", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "data": createDatatable(testCsvFilePath),
        "column name": "Country",
      },
    );
    assert.ok(output.list, "adaptor should return list");
    const actual = output.list;
    const expected = [ "de", "fr", "gb", "gb" ];
    assert.deepEqual(actual, expected);
  });

  await t.test("given a column in a datatable, it should return a list of the column values", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "data": createDatatable(testCsvFilePath),
        "column name": "Country",
        "unique values": true,
      },
    );
    assert.ok(output.list, "adaptor should return list");
    const actual = output.list;
    const expected = [ "de", "fr", "gb" ];
    assert.deepEqual(actual, expected);
  });

});
