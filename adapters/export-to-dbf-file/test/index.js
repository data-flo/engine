const test = require("node:test");
const assert = require("node:assert");
const path = require("node:path");

const DBFFile = require("dbffile");

const { compareFile } = require("../../../utils/testing/unit.js");
const createTmpTextFile = require("../../../utils/file/tmp-text.js");
const runAdaptor = require("../../../runner/run-adaptor.js");
const createFile = require("../../../types/file.js");
const createDatatable = require("../../../types/datatable.js");

const adaptor = require("../index.js");

test("export-to-dbf-file adaptor", async (t) => {
  const testCsvFilePath = await createTmpTextFile(`"id","a","b"
  "2","alpha 2","beta 2"
  "3","alpha 3","beta 3"
  `
  );
  await t.test("given an dbf file, it should return a datatable", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "data": createDatatable(testCsvFilePath),
        "column types": {
          "id": "C 1",
          "a": "C 100",
          "b": "C 100",
        },
      },
    );
    assert.ok(output.dbf, "adaptor should return dbf");
    const dbf = await DBFFile.open(output.dbf.getSource());
    const records = await dbf.readRecords(dbf.recordCount);
    assert.equal(records[0].id, "2");
    assert.equal(records[0].a, "alpha 2");
    assert.equal(records[0].b, "beta 2");
    assert.equal(records[1].id, "3");
    assert.equal(records[1].a, "alpha 3");
    assert.equal(records[1].b, "beta 3");
  });
});
