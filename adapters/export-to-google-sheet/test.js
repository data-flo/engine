const test = require("node:test");
const assert = require("node:assert");

const runAdaptor = require("../../runner/run-adaptor.js");
const createTmpTextFile = require("../../utils/file/tmp-text.js");
const createDatatable = require("../../types/datatable.js");

const adaptor = require("./index.js");

test("export-to-google-sheet adaptor", async (t) => {
  const csvText = `"id","Country","empty","date a","date b"
"Bovine","de",,"Jan 29, 2007","2007-01-28"
"Gibbon","fr",,,
"Orangutan",,,,
"Gorilla",,,,
"Human","gb",,,
"Mouse","gb",,,
`;
  const testCsvFilePath = await createTmpTextFile(csvText);

  await t.test("given a datatable, it should return a csv file", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "data": createDatatable(testCsvFilePath),
        "url": "https://docs.google.com/spreadsheets/d/1KUbhcYUjGJCf8kMdBwuUh2VWo63oYyBDB79Gbv8G5QA/edit#gid=0",
        "id column": "id",
      },
    );
    assert.ok(output["updated row ids"], "adaptor should return updated row ids");
    assert.ok(output["created row ids"], "adaptor should return created row ids");
    assert.ok(output["skipped row ids"], "adaptor should return skipped row ids");
    assert.ok(output["appended columns"], "adaptor should return appended columns");
  });

});
