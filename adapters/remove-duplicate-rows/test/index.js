const test = require("node:test");
const assert = require("node:assert");

const { compareFile } = require("../../../utils/testing/unit.js");

const runAdaptor = require("../../../runner/run-adaptor.js");
const createTmpTextFile = require("../../../utils/file/tmp-text.js");
const createDatatable = require("../../../types/datatable.js");

const adaptor = require("../index.js");

test("remove-duplicate-rows adaptor", async (t) => {
  const testCsvFilePath = await createTmpTextFile(`"id","country","year"
"Human","gb","2000"
"Gibbon","fr",
"Orangutan",,
"Gorilla",,
"Mouse","GB","2001"
"HUMAN","gb","2000"
`);

  await t.test("given id column, it should return the same datatable", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "data": createDatatable(testCsvFilePath),
        "column names": [
          "id",
        ],
        "case sensitive": true,
      },
    );
    assert.ok(output.data, "adaptor should return data");
    compareFile(
      output.data.getSource(),
      `"id","country","year"
"Human","gb","2000"
"Gibbon","fr",
"Orangutan",,
"Gorilla",,
"Mouse","GB","2001"
"HUMAN","gb","2000"
`
    );
  });

  await t.test("given no columns and case sensitive set to false, it should return 5 rows", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "data": createDatatable(testCsvFilePath),
        "case sensitive": false,
      },
    );
    assert.ok(output.data, "adaptor should return data");
    compareFile(
      output.data.getSource(),
      `"id","country","year"
"Human","gb","2000"
"Gibbon","fr",
"Orangutan",,
"Gorilla",,
"Mouse","GB","2001"
`
    );
  });

  await t.test("given country column, it should return 4 rows", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "data": createDatatable(testCsvFilePath),
        "column names": [
          "country",
        ],
        "case sensitive": true,
      },
    );
    assert.ok(output.data, "adaptor should return data");
    compareFile(
      output.data.getSource(),
      `"id","country","year"
"Human","gb","2000"
"Gibbon","fr",
"Orangutan",,
"Mouse","GB","2001"
`
    );
  });

  await t.test("given country column and case sensitive set to false, it should return 3 rows", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "data": createDatatable(testCsvFilePath),
        "column names": [
          "country",
        ],
        "case sensitive": false,
      },
    );
    assert.ok(output.data, "adaptor should return data");
    compareFile(
      output.data.getSource(),
      `"id","country","year"
"Human","gb","2000"
"Gibbon","fr",
"Orangutan",,
`
    );
  });

  await t.test("given id and country columns, and case sensitive set to false, it should return 5 rows", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "data": createDatatable(testCsvFilePath),
        "column names": [
          "id",
          "country",
        ],
        "case sensitive": false,
      },
    );
    assert.ok(output.data, "adaptor should return data");
    compareFile(
      output.data.getSource(),
      `"id","country","year"
"Human","gb","2000"
"Gibbon","fr",
"Orangutan",,
"Gorilla",,
"Mouse","GB","2001"
`
    );
  });

});
