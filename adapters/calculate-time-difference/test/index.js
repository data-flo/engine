const test = require("node:test");
const assert = require("node:assert");

const { compareFile } = require("../../../utils/testing/unit.js");

const createTmpTextFile = require("../../../utils/file/tmp-text.js");
const createDatatable = require("../../../types/datatable.js");

const runAdaptor = require("../../../runner/run-adaptor.js");

const adaptor = require("../index.js");

test("calculate-time-difference adaptor", async (t) => {
  const testCsvFilePath = await createTmpTextFile(`"id","Country","empty","date a","date b"
"Bovine","de",,"Jan 29, 2007","2007-01-28"
"Gibbon","fr",,,
"Orangutan",,,,
"Gorilla",,,,
"Human","gb",,,
"Mouse","gb",,,
`);

  await t.test("given two columns, it should add the differnce in days", async () => {
    const output = await runAdaptor(
      adaptor, {
        "data": createDatatable(testCsvFilePath),
        "column one": "date a",
        "column one format": "MMM D, YYYY",
        "column two": "date b",
        "column two format": "",
        "difference column": "days",
        "difference unit": "days",
      });
    assert.ok(output.data, "adaptor should return data");
    compareFile(
      output.data.getSource(),
      `"id","Country","empty","date a","date b","days"
"Bovine","de",,"Jan 29, 2007","2007-01-28","1"
"Gibbon","fr",,,,
"Orangutan",,,,,
"Gorilla",,,,,
"Human","gb",,,,
"Mouse","gb",,,,
`
    );
  });

  await t.test("given two columns and no difference column, it should add output to differnce column", async () => {
    const output = await runAdaptor(
      adaptor, {
        "data": createDatatable(testCsvFilePath),
        "column one": "date a",
        "column one format": "MMM D, YYYY",
        "column two": "date b",
        "column two format": "",
        "difference unit": "days",
      });
    assert.ok(output.data, "adaptor should return data");
    compareFile(
      output.data.getSource(),
      `"id","Country","empty","date a","date b","difference"
"Bovine","de",,"Jan 29, 2007","2007-01-28","1"
"Gibbon","fr",,,,
"Orangutan",,,,,
"Gorilla",,,,,
"Human","gb",,,,
"Mouse","gb",,,,
`
    );
  });

  await t.test("given two columns in reverse, it should add the differnce as negative", async () => {
    const output = await runAdaptor(
      adaptor, {
        "data": createDatatable(testCsvFilePath),
        "column one": "date b",
        "column two": "date a",
        "column two format": "MMM D, YYYY",
        "difference column": "days",
        "difference unit": "days",
      });
    assert.ok(output.data, "adaptor should return data");
    compareFile(
      output.data.getSource(),
      `"id","Country","empty","date a","date b","days"
"Bovine","de",,"Jan 29, 2007","2007-01-28","-1"
"Gibbon","fr",,,,
"Orangutan",,,,,
"Gorilla",,,,,
"Human","gb",,,,
"Mouse","gb",,,,
`
    );
  });

  await t.test("given non-existing as column one, it should throw an error", async () => {
    await assert.rejects(
      adaptor({
        "data": createDatatable(testCsvFilePath),
        "column one": "A",
        "column one format": "MMM D, YYYY",
        "column two": "date b",
        "column two format": "",
        "difference column": "id",
        "difference unit": "days",
      }),
      ("Datatable dot not include a column named A"),
    );
  });

  await t.test("given non-existing as column two, it should throw an error", async () => {
    await assert.rejects(
      adaptor({
        "data": createDatatable(testCsvFilePath),
        "column one": "date a",
        "column one format": "MMM D, YYYY",
        "column two": "B",
        "column two format": "",
        "difference column": "id",
        "difference unit": "days",
      }),
      ("Datatable dot not include a column named B"),
    );
  });

  await t.test("given an existing column, it should throw an error", async () => {
    await assert.rejects(
      adaptor({
        "data": createDatatable(testCsvFilePath),
        "column one": "date a",
        "column one format": "MMM D, YYYY",
        "column two": "date b",
        "column two format": "",
        "difference column": "id",
        "difference unit": "days",
      }),
      new Error("Datatable already includes a column named id"),
    );
  });

});
