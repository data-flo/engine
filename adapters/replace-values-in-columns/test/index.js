const test = require("node:test");
const assert = require("node:assert");

const { compareFile } = require("../../../utils/testing/unit.js");

const runAdaptor = require("../../../runner/run-adaptor.js");
const createTmpTextFile = require("../../../utils/file/tmp-text.js");
const createDatatable = require("../../../types/datatable.js");

const adaptor = require("../index.js");

test("replace-values-in-columns adaptor", async (t) => {
  const testCsvFilePath = await createTmpTextFile(
    `"id","name","country"\n"1","Bovine","de"\n"2","Gibbon","de"\n"3","Orangutan","fr"\n"4",,\n"5","Human",\n"6","Mouse","gb"\n`
  );

  await t.test("given one column, it should return a datatable with replaced values", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "data": createDatatable(testCsvFilePath),
        "columns": [ [ "country" ] ],
        "pattern": "/^$/",
        "replacement": "n/a",
      },
    );
    assert.ok(output.data, "adaptor should return data");
    compareFile(
      output.data.getSource(),
      `"id","name","country"\n"1","Bovine","de"\n"2","Gibbon","de"\n"3","Orangutan","fr"\n"4",,"n/a"\n"5","Human","n/a"\n"6","Mouse","gb"\n`
    );
  });

  await t.test("given one column, it should return a datatable with replaced values", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "data": createDatatable(testCsvFilePath),
        "columns": [ [ "country", "new country" ] ],
        "pattern": "/^$/",
        "replacement": "n/a",
      },
    );
    assert.ok(output.data, "adaptor should return data");
    compareFile(
      output.data.getSource(),
      `"id","name","country","new country"\n"1","Bovine","de","de"\n"2","Gibbon","de","de"\n"3","Orangutan","fr","fr"\n"4",,,"n/a"\n"5","Human",,"n/a"\n"6","Mouse","gb","gb"\n`
    );
  });

  await t.test("given two column, it should return a datatable with replaced values", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "data": createDatatable(testCsvFilePath),
        "columns": [ ["country"], ["name"] ],
        "pattern": "/^$/",
        "replacement": "n/a",
      },
    );
    assert.ok(output.data, "adaptor should return data");
    compareFile(
      output.data.getSource(),
      `"id","name","country"\n"1","Bovine","de"\n"2","Gibbon","de"\n"3","Orangutan","fr"\n"4","n/a","n/a"\n"5","Human","n/a"\n"6","Mouse","gb"\n`
    );
  });

});
