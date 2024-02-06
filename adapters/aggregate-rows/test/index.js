const test = require("node:test");
const assert = require("node:assert");

const { compareFile } = require("../../../utils/testing/unit.js");
const runAdaptor = require("../../../runner/run-adaptor.js");
const adaptor = require("../index.js");
const createTmpTextFile = require("../../../utils/file/tmp-text.js");
const createDatatable = require("../../../types/datatable.js");

test("aggregate-rows adaptor", async (t) => {
  const testCsvFilePath = await createTmpTextFile(`"id","name","country","city"
"1","Bovine","de","berlin"
"2","Gibbon","de","berlin"
"3","Orangutan","fr",
"4","Gorilla",,
"5","Human","gb","london"
"6","Mouse","gb","manchester"
`);

  await t.test("given one column and sum aggregation, it should return a datatable with 4 row", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "data": createDatatable(testCsvFilePath),
        "group column names": ["country"],
        "aggregations": {
          "id": "sum",
        },
      },
    );
    assert.ok(output.data, "adaptor should return data");
    compareFile(
      output.data.getSource(),
      `"country (aggregated)","id (sum)"\n"de","3"\n"fr","3"\n,"4"\n"gb","11"\n`,
    );
  });

  await t.test("given one column and two aggregation, it should return a datatable with 4 row", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "data": createDatatable(testCsvFilePath),
        "group column names": ["country"],
        "aggregations": {
          "id": "sum",
          "city": "unique-values",
        },
      },
    );
    assert.ok(output.data, "adaptor should return data");
    compareFile(
      output.data.getSource(),
      `"country (aggregated)","id (sum)","city (unique-values)"\n"de","3","berlin"\n"fr","3",\n,"4",\n"gb","11","london,manchester"\n`,
    );
  });

  await t.test("given two columns and sum aggregation, it should return a datatable with 5 row", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "data": createDatatable(testCsvFilePath),
        "group column names": ["country", "city"],
        "aggregations": {
          "id": "sum",
        },
      },
    );
    assert.ok(output.data, "adaptor should return data");
    compareFile(
      output.data.getSource(),
      `"country (aggregated)","city (aggregated)","id (sum)"\n"de","berlin","3"\n"fr",,"3"\n,,"4"\n"gb","london","5"\n"gb","manchester","6"\n`,
    );
  });

});
