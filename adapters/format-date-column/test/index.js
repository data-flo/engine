const test = require("node:test");
const assert = require("node:assert");

const { compareFile } = require("../../../utils/testing/unit.js");
const createTmpTextFile = require("../../../utils/file/tmp-text.js");
const createDatatable = require("../../../types/datatable.js");
const runAdaptor = require("../../../runner/run-adaptor.js");

const adaptor = require("../index.js");

test("format-date-column adaptor", async (t) => {
  const testCsvFilePath = await createTmpTextFile(`"id","Country","empty","date a","date b"
"Bovine","de",,"Jan 29, 2007","2007-01-29T00:00:00+01:00"
"Gibbon","fr",,,
`);

  await t.test("given a new column, it should add new values to the new column", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "data": createDatatable(testCsvFilePath),
        "original column name": "date a",
        "original format": "MMM D, YYYY",
        "new column name": "date c",
        "new format": "YYYY-MM-DD",
      },
    );
    assert.ok(output.data, "adaptor should return data");
    compareFile(
      output.data.getSource(),
      `"id","Country","empty","date a","date b","date c"\n"Bovine","de",,"Jan 29, 2007","2007-01-29T00:00:00+01:00","2007-01-29"\n"Gibbon","fr",,,,\n`,
    );
  });

  await t.test("given only original column, it should add new values to the original column", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "data": createDatatable(testCsvFilePath),
        "original column name": "date a",
        "original format": "MMM D, YYYY",
      },
    );
    assert.ok(output.data, "adaptor should return data");
    compareFile(
      output.data.getSource(),
      `"id","Country","empty","date a","date b"\n"Bovine","de",,"2007-01-29T00:00:00+00:00","2007-01-29T00:00:00+01:00"\n"Gibbon","fr",,,\n`,
    );
  });

  await t.test("given only original column, it should add new values to the original column", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "data": createDatatable(testCsvFilePath),
        "original column name": "date b",
      },
    );
    assert.ok(output.data, "adaptor should return data");
    compareFile(
      output.data.getSource(),
      `"id","Country","empty","date a","date b"\n"Bovine","de",,"Jan 29, 2007","2007-01-28T23:00:00+00:00"\n"Gibbon","fr",,,\n`,
    );
  });

});
