const test = require("node:test");
const assert = require("node:assert");

const { compareFile } = require("../../../utils/testing/unit.js");
const createTmpTextFile = require("../../../utils/file/tmp-text.js");
const createDatatable = require("../../../types/datatable.js");
const runAdaptor = require("../../../runner/run-adaptor.js");

const adaptor = require("../index.js");

test("split-column adaptor", async (t) => {
  const testCsvFilePath = await createTmpTextFile(`"id","Country"
"2000|b|c","gb"
"2022|2","fr"
"2010",
"|Gorilla",
"","gb"
"|","de"
`);

  await t.test("given a datatable and two new columns, it should return a datatable", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "data": createDatatable(testCsvFilePath),
        "column name": "id",
        "separator": "|",
        "new column names": [
          "year",
          "id2",
        ],
      },
    );
    assert.ok(output.data, "adaptor should return data");
    compareFile(
      output.data.getSource(),
      `"id","Country","year","id2"
"2000|b|c","gb","2000","b"
"2022|2","fr","2022","2"
"2010",,"2010",
"|Gorilla",,,"Gorilla"
,"gb",,
"|","de",,
`
    );
  });

  await t.test("given a datatable and one new column, it should return a datatable", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "data": createDatatable(testCsvFilePath),
        "column name": "id",
        "separator": "|",
        "new column names": [
          "year",
        ],
      },
    );
    assert.ok(output.data, "adaptor should return data");
    compareFile(
      output.data.getSource(),
      `"id","Country","year"
"2000|b|c","gb","2000"
"2022|2","fr","2022"
"2010",,"2010"
"|Gorilla",,
,"gb",
"|","de",
`
    );
  });

  await t.test("given a datatable and two new columns, it should return a datatable", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "data": createDatatable(testCsvFilePath),
        "column name": "id",
        "separator": "|",
        "new column names": [
          "year",
          "id2",
        ],
        "include column": false,
      },
    );
    assert.ok(output.data, "adaptor should return data");
    compareFile(
      output.data.getSource(),
      `"Country","year","id2"
"gb","2000","b"
"fr","2022","2"
,"2010",
,,"Gorilla"
"gb",,
"de",,
`
    );
  });

});
