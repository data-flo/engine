const test = require("node:test");
const assert = require("node:assert");

const { compareFile } = require("../../../utils/testing/unit.js");

const runAdaptor = require("../../../runner/run-adaptor.js");
const createTmpTextFile = require("../../../utils/file/tmp-text.js");
const createDatatable = require("../../../types/datatable.js");

const adaptor = require("../index.js");

test("map-column-values adaptor", async (t) => {
  const testCsvFilePath = await createTmpTextFile(`"id","Country"
"Bovine","de"
"Gibbon","fr"
"Orangutan",
"Gorilla",
"Human","gb"
"Mouse","GB"
`);

  await t.test("given a datatable and original column, it should write results to the same original column", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "data": createDatatable(testCsvFilePath),
        "original column": "Country",
        "values": [
          [ "de", "Germany" ],
          [ "fr", "France" ],
          [ "gb", "UK" ],
        ],
        "case sensitive": false,
      },
    );
    assert.ok(output.data, "adaptor should return data");
    compareFile(
      output.data.getSource(),
      `"id","Country"
"Bovine","Germany"
"Gibbon","France"
"Orangutan",
"Gorilla",
"Human","UK"
"Mouse","UK"
`
    );
  });

  await t.test("given a datatable, original column and case sensitive, it should write results to the same original column", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "data": createDatatable(testCsvFilePath),
        "original column": "Country",
        "values": [
          [ "de", "Germany" ],
          [ "fr", "France" ],
          [ "gb", "UK" ],
        ],
        "case sensitive": true,
      },
    );
    assert.ok(output.data, "adaptor should return data");
    compareFile(
      output.data.getSource(),
      `"id","Country"
"Bovine","Germany"
"Gibbon","France"
"Orangutan",
"Gorilla",
"Human","UK"
"Mouse",
`
    );
  });

  await t.test("given a datatable, original column and include unmapped values, it should write results to the same original column", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "data": createDatatable(testCsvFilePath),
        "original column": "Country",
        "values": [
          [ "de", "Germany" ],
          [ "fr", "France" ],
          [ "gb", "UK" ],
        ],
        "case sensitive": true,
        "unmapped values": "include",
      },
    );
    assert.ok(output.data, "adaptor should return data");
    compareFile(
      output.data.getSource(),
      `"id","Country"
"Bovine","Germany"
"Gibbon","France"
"Orangutan",
"Gorilla",
"Human","UK"
"Mouse","GB"
`
    );
  });

  await t.test("given a datatable and original column, it should write results to the same original column", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "data": createDatatable(testCsvFilePath),
        "original column": "Country",
        "new column": "Country Name",
        "values": [
          [ "de", "Germany" ],
          [ "fr", "France" ],
          [ "gb", "UK" ],
        ],
        "case sensitive": true,
      },
    );
    assert.ok(output.data, "adaptor should return data");
    compareFile(
      output.data.getSource(),
      `"id","Country","Country Name"
"Bovine","de","Germany"
"Gibbon","fr","France"
"Orangutan",,
"Gorilla",,
"Human","gb","UK"
"Mouse","GB",
`
    );
  });

});
