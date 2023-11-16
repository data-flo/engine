const test = require("node:test");
const assert = require("node:assert");

const { compareFile } = require("../../utils/testing/unit.js");

const runAdaptor = require("../../runner/run-adaptor.js");
const createTmpTextFile = require("../../utils/file/tmp-text.js");
const createDatatable = require("../../types/datatable.js");

const adaptor = require("./index.js");

test("join-datatables adaptor", async (t) => {

  const leftCsvFilePath = await createTmpTextFile(`"id","Country"
"Bovine","de"
"Gibbon","fr"
"Orangutan",
"Gorilla",
"Human","gb"
"Mouse","GB"
"Peru","Peru"
`);
  const rightCsvFilePath = await createTmpTextFile(`"code","name"
"de","Germany"
"fr","France"
"gb","UK"
"us","USA"
"it","Italy"
"Perú","Perú"
`);

  await t.test("given two datatables, it should return a datatable with left join", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "main data": createDatatable(leftCsvFilePath),
        "main column": "Country",
        "other data": createDatatable(rightCsvFilePath),
        "other column": "code",
      },
    );
    assert.ok(output.data, "adaptor should return data");
    compareFile(
      output.data.getSource(),
      `"id","Country","code","name"
"Bovine","de","de","Germany"
"Gibbon","fr","fr","France"
"Orangutan",,,
"Gorilla",,,
"Human","gb","gb","UK"
"Mouse","GB","gb","UK"
"Peru","Peru","Perú","Perú"
`
    );
  });

  await t.test("given two datatables and exact match to true, it should return a datatable with left join", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "main data": createDatatable(leftCsvFilePath),
        "main column": "Country",
        "other data": createDatatable(rightCsvFilePath),
        "other column": "code",
        "case sensitive": true,
        "match diacritics": true,
      },
    );
    assert.ok(output.data, "adaptor should return data");
    compareFile(
      output.data.getSource(),
      `"id","Country","code","name"
"Bovine","de","de","Germany"
"Gibbon","fr","fr","France"
"Orangutan",,,
"Gorilla",,,
"Human","gb","gb","UK"
"Mouse","GB",,
"Peru","Peru",,
`
    );
  });

  await t.test("given two datatables, it should return a datatable with inner join", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "main data": createDatatable(leftCsvFilePath),
        "main column": "Country",
        "other data": createDatatable(rightCsvFilePath),
        "other column": "code",
        "join type": "Inner Join",
      },
    );
    assert.ok(output.data, "adaptor should return data");
    compareFile(
      output.data.getSource(),
      `"id","Country","code","name"
"Bovine","de","de","Germany"
"Gibbon","fr","fr","France"
"Human","gb","gb","UK"
"Mouse","GB","gb","UK"
"Peru","Peru","Perú","Perú"
`
    );
  });

  await t.test("given two datatables, it should return a datatable with full join", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "main data": createDatatable(leftCsvFilePath),
        "main column": "Country",
        "other data": createDatatable(rightCsvFilePath),
        "other column": "code",
        "join type": "Full Join",
      },
    );
    assert.ok(output.data, "adaptor should return data");
    compareFile(
      output.data.getSource(),
      `"id","Country","code","name"
"Bovine","de","de","Germany"
"Gibbon","fr","fr","France"
"Orangutan",,,
"Gorilla",,,
"Human","gb","gb","UK"
"Mouse","GB","gb","UK"
"Peru","Peru","Perú","Perú"
,,"us","USA"
,,"it","Italy"
`
    );
  });

  await t.test("given two datatables and prefix, it should return a datatable with left join", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "main data": createDatatable(leftCsvFilePath),
        "main column": "Country",
        "other data": createDatatable(rightCsvFilePath),
        "other column": "code",
        "prefix": "country.",
      },
    );
    assert.ok(output.data, "adaptor should return data");
    compareFile(
      output.data.getSource(),
      `"id","Country","country.code","country.name"
"Bovine","de","de","Germany"
"Gibbon","fr","fr","France"
"Orangutan",,,
"Gorilla",,,
"Human","gb","gb","UK"
"Mouse","GB","gb","UK"
"Peru","Peru","Perú","Perú"
`
    );
  });

});
