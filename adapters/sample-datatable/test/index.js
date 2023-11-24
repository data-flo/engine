const test = require("node:test");
const assert = require("node:assert");
const fs = require("node:fs");

const { compareFile } = require("../../../utils/testing/unit.js");
const createTmpTextFile = require("../../../utils/file/tmp-text.js");
const createDatatable = require("../../../types/datatable.js");
const runAdaptor = require("../../../runner/run-adaptor.js");

const adaptor = require("../index.js");

test("sample-datatable adaptor", async (t) => {
  const testCsvFilePath = await createTmpTextFile(`"id","Country","num"
"Bovine","de","1"
"Gibbon","fr","1"
"Orangutan",,"0"
"Gorilla","gb","-2"
"Human","gb","0x"
"Mouse","GB",
`);

  await t.test("given a datatable, it should return the first 100 rows", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "data": createDatatable(testCsvFilePath),
      },
    );
    assert.ok(output["sample data"], "adaptor should return data");
    compareFile(
      output["sample data"].getSource(),
      `"id","Country","num"
"Bovine","de","1"
"Gibbon","fr","1"
"Orangutan",,"0"
"Gorilla","gb","-2"
"Human","gb","0x"
"Mouse","GB",
`,
    );
  });

  await t.test("given a sample size of 2, it should return 2 rows", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "data": createDatatable(testCsvFilePath),
        "sample size": "2",
      },
    );
    assert.ok(output["sample data"], "adaptor should return data");
    compareFile(
      output["sample data"].getSource(),
      `"id","Country","num"
"Bovine","de","1"
"Gibbon","fr","1"
`
    );
  });

  await t.test("given a sample size of 2 and method set to last, it should return the last 2 rows", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "data": createDatatable(testCsvFilePath),
        "sampling method": "last",
        "sample size": "2",
      },
    );
    assert.ok(output["sample data"], "adaptor should return data");
    compareFile(
      output["sample data"].getSource(),
      `"id","Country","num"
"Human","gb","0x"
"Mouse","GB",
`
    );
  });

  await t.test("given a sample size of 3 and method set to random, it should return 3 random rows", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "data": createDatatable(testCsvFilePath),
        "sampling method": "random",
        "sample size": "3",
      },
    );
    assert.ok(output["sample data"], "adaptor should return data");
    const content = fs.readFileSync(output["sample data"].getSource(), "utf8");
    assert.ok(content.includes(`"id","Country","num"`));
    assert.equal(
      [
        content.includes(`"Bovine","de","1"`),
        content.includes(`"Gibbon","fr","1"`),
        content.includes(`"Orangutan",,"0"`),
        content.includes(`"Gorilla","gb","-2"`),
        content.includes(`"Human","gb","0x"`),
        content.includes(`"Mouse","GB",`),
      ].filter(Boolean).length,
      3,
    );
  });

});
