const test = require("node:test");
const assert = require("node:assert");

const runAdaptor = require("../../../runner/run-adaptor.js");
const adaptor = require("../index.js");
const createTmpTextFile = require("../../../utils/file/tmp-text.js");
const createDatatable = require("../../../types/datatable.js");

test("create-map-from-datatable adaptor", async (t) => {
  const testCsvFilePath = await createTmpTextFile(`"id","Country","empty","date a","date b"
"Bovine","de",,"Jan 29, 2007","2007-01-28"
"Gibbon","fr",,,
"Orangutan",,,,
"Gorilla",,,,
"Human","gb",,,
"Mouse","gb",,,
`);

  await t.test("given a column in a datatable, it should return a map", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "data": createDatatable(testCsvFilePath),
        "key column": "id",
        "value column": "Country",
      },
    );
    assert.ok(output.dictionary, "adaptor should return dictionary");
    const actual = output.dictionary;
    const expected = new Map([ [ "Bovine", "de" ], [ "Gibbon", "fr" ], [ "Orangutan", "" ], [ "Gorilla", "" ], [ "Human", "gb" ], [ "Mouse", "gb" ] ]);
    assert.deepEqual(actual, expected);
  });

  await t.test("given a column in a datatable, it should return a map", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "data": createDatatable(testCsvFilePath),
        "key column": "Country",
        "value column": "id",
      },
    );
    assert.ok(output.dictionary, "adaptor should return dictionary");
    const actual = output.dictionary;
    const expected = new Map([ [ "de", "Bovine" ], [ "fr", "Gibbon" ], [ "gb", "Human" ] ]);
    assert.deepEqual(actual, expected);
  });

});
