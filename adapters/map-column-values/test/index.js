const test = require("node:test");
const assert = require("node:assert");

const { compareFile } = require("../../../utils/testing/unit.js");

const runAdaptor = require("../../../runner/run-adaptor.js");
const createTmpTextFile = require("../../../utils/file/tmp-text.js");
const createDatatable = require("../../../types/datatable.js");

const adaptor = require("../index.js");

test("map-column-values adaptor", async (t) => {

  await t.test("given a datatable and original column, it should write results to the same original column", async () => {
    const testCsvFilePath = await createTmpTextFile(`"id","Country"\n"Bovine","de"\n"Gibbon","fr"\n"Orangutan",\n"Gorilla",\n"Human","gb"\n"Mouse","GB"\n`);

    const output = await runAdaptor(
      adaptor,
      {
        "data": createDatatable(testCsvFilePath),
        "columns": [ { key: "Country" } ],
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

  await t.test("given a datatable and two original columns, it should write results to the same original columns", async () => {
    const testCsvFilePath = await createTmpTextFile(`"id","Country","country code"
      "Bovine","de","de"
      "Gibbon","fr","fr"
      "Orangutan",,
      "Gorilla",,
      "Human","gb","gb"
      "Mouse","GB","GB"
      `);

    const output = await runAdaptor(
      adaptor,
      {
        "data": createDatatable(testCsvFilePath),
        "columns": [ { key: "Country" }, { key: "country code" } ],
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
      `"id","Country","country code"
"Bovine","Germany","Germany"
"Gibbon","France","France"
"Orangutan",,
"Gorilla",,
"Human","UK","UK"
"Mouse","UK","UK"
`
    );
  });

  await t.test("given a datatable, original column and case sensitive, it should write results to the same original column", async () => {
    const testCsvFilePath = await createTmpTextFile(`"id","Country"\n"Bovine","de"\n"Gibbon","fr"\n"Orangutan",\n"Gorilla",\n"Human","gb"\n"Mouse","GB"\n`);

    const output = await runAdaptor(
      adaptor,
      {
        "data": createDatatable(testCsvFilePath),
        "columns": [ { key: "Country" } ],
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
    const testCsvFilePath = await createTmpTextFile(`"id","Country"\n"Bovine","de"\n"Gibbon","fr"\n"Orangutan",\n"Gorilla",\n"Human","gb"\n"Mouse","GB"\n`);

    const output = await runAdaptor(
      adaptor,
      {
        "data": createDatatable(testCsvFilePath),
        "columns": [ { key: "Country" } ],
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
    const testCsvFilePath = await createTmpTextFile(`"id","Country"\n"Bovine","de"\n"Gibbon","fr"\n"Orangutan",\n"Gorilla",\n"Human","gb"\n"Mouse","GB"\n`);

    const output = await runAdaptor(
      adaptor,
      {
        "data": createDatatable(testCsvFilePath),
        "columns": [ { key: "Country", value: "Country Name" } ],
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

  await t.test("given a datatable and original column, it should write results to the same original column", async () => {
    const testCsvFilePath = await createTmpTextFile(`"id","Country"
"Bovine","de"
"Gibbon","fr"
"Orangutan",
"Gorilla",
"Human","gb"
"Mouse","GB"
`);

    const output = await runAdaptor(
      adaptor,
      {
        "data": createDatatable(testCsvFilePath),
        "columns": [ { key: "Country" } ],
        "values": [
          [ "/([a-z]+)/", "lowercase $1" ],
          [ "/([A-Z]+)/", "uppercase $1" ],
        ],
        "case sensitive": true,
      },
    );
    assert.ok(output.data, "adaptor should return data");
    compareFile(
      output.data.getSource(),
      `"id","Country"
"Bovine","lowercase de"
"Gibbon","lowercase fr"
"Orangutan",
"Gorilla",
"Human","lowercase gb"
"Mouse","uppercase GB"
`
    );
  });

  await t.test("given a datatable and original column, it should write results to the same original column", async () => {
    const testCsvFilePath = await createTmpTextFile(`"serotype"\n"5"\n"15C"\n`);

    const output = await runAdaptor(
      adaptor,
      {
        "data": createDatatable(testCsvFilePath),
        "columns": [ { key: "serotype" } ],
        "values": [
          [ "5", "PVC 10" ],
        ],
        "unmapped values": "include",
      },
    );
    assert.ok(output.data, "adaptor should return data");
    compareFile(
      output.data.getSource(),
      `"serotype"\n"PVC 10"\n"15C"\n`
    );
  });
});
