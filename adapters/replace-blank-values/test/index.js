const test = require("node:test");
const assert = require("node:assert");

const { compareFile } = require("../../../utils/testing/unit.js");
const createTmpTextFile = require("../../../utils/file/tmp-text.js");
const createDatatable = require("../../../types/datatable.js");
const runAdaptor = require("../../../runner/run-adaptor.js");

const adaptor = require("../index.js");

test("replace-blank-values adaptor", async (t) => {
  const testCsvFilePath = await createTmpTextFile(
    `"id","name","country"\n"1","Bovine","de"\n"2","Gibbon","de"\n"3","Orangutan","fr"\n"4",,\n"5","Human",\n"6","Mouse","gb"\n`
  );

  await t.test("given one column, it should return a datatable without blanks", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "data": createDatatable(testCsvFilePath),
        "columns": [ "country" ],
        "new value": "n/a",
      },
    );
    assert.ok(output.data, "adaptor should return data");
    compareFile(
      output.data.getSource(),
      `"id","name","country"\n"1","Bovine","de"\n"2","Gibbon","de"\n"3","Orangutan","fr"\n"4",,"n/a"\n"5","Human","n/a"\n"6","Mouse","gb"\n`
    );
  });

  await t.test("given two column, it should return a datatable without blanks", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "data": createDatatable(testCsvFilePath),
        "columns": [ "country", "name" ],
        "new value": "n/a",
      },
    );
    assert.ok(output.data, "adaptor should return data");
    compareFile(
      output.data.getSource(),
      `"id","name","country"\n"1","Bovine","de"\n"2","Gibbon","de"\n"3","Orangutan","fr"\n"4","n/a","n/a"\n"5","Human","n/a"\n"6","Mouse","gb"\n`
    );
  });

});
