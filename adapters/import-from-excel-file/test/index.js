const test = require("node:test");
const assert = require("node:assert");
const Path = require("path");
const { compareFile } = require("../../../utils/testing/unit.js");

const runAdaptor = require("../../../runner/run-adaptor.js");
const createFile = require("../../../types/file.js");
const adaptor = require("../index.js");

const file = Path.resolve(__dirname, "..", "..", "..", "dev", "data", "microreact-project-H1mdhyO3l-data.xlsx");

test("import-from-excel-file adaptor", async (t) => {
  await t.test("given an excel file, it should return a datatable", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "file": createFile(file),
        "sheet name": "Sheet1",
      },
    );
    assert.ok(output.data, "adaptor should return data");
    compareFile(
      output.data.getSource(),
      `"a","b","c"\n"1","2","3"\n"1","2","3"\n`,
    );
  });

  await t.test("given an excel file and a range, it should return a datatable", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "file": createFile(file),
        "sheet name": "Sheet1",
        "range": "A1:C2",
      },
    );
    assert.ok(output.data, "adaptor should return data");
    compareFile(
      output.data.getSource(),
      `"a","b","c"\n"1","2","3"\n`,
    );
  });

  await t.test("given an excel file, it should return a datatable", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "file": createFile(file),
        "sheet name": "Sheet1",
        "range": "2",
      },
    );
    assert.ok(output.data, "adaptor should return data");
    compareFile(
      output.data.getSource(),
      `"1","2","3"\n"1","2","3"\n`,
    );
  });

  await t.test("given an excel file, it should return a datatable", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "file": createFile(file),
        "sheet name": "Sheet1",
        "range": "B1:C3",
      },
    );
    assert.ok(output.data, "adaptor should return data");
    compareFile(
      output.data.getSource(),
      `"b","c"\n"2","3"\n"2","3"\n`,
    );
  });

  await t.test("given a skip argument, it should return the correct datatable", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "file": createFile(file),
        "sheet name": "Sheet1",
        "skip": ["2"],
      },
    );
    assert.ok(output.data, "adaptor should return data");
    compareFile(
      output.data.getSource(),
      `"a","b","c"\n"1","2","3"\n`,
    );
  });

  await t.test("given a large excel file, it should return 6921 rows", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "file": createFile(Path.resolve(__dirname, "..", "..", "..", "dev", "data", "large-excel.xlsx")),
      },
    );
    assert.ok(output.data, "adaptor should return data");
    assert.equal(
      await output.data.getNumberOfRows(),
      6921,
    );
  });
});
