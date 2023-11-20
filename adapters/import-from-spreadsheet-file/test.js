/* eslint-disable quotes */

const Path = require("path");

const tap = require("../../utils/testing/unit");

const runAdaptor = require("../../runner/run-adaptor");
const adaptor = require("./index");
const createFile = require("../../types/file");

await t.test("import-from-excel-file adaptor", async () => {

  await t.test("given an excel file, it should return a datatable", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "file": createFile(Path.resolve(__dirname, "..", "..", "dev", "data", "microreact-project-H1mdhyO3l-data.xlsx")),
        "sheet name": "Sheet1",
      },
    );
    assert.ok(output.data, "adaptor should return data");
    compareFile(
      output.data.getSource(),
      `"a","b","c"\n"1","2","3"\n"1","2","3"\n`,
    );
  });

  await t.test("given an excel file, it should return a datatable", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "file": createFile(Path.resolve(__dirname, "..", "..", "dev", "data", "microreact-project-H1mdhyO3l-data.xlsx")),
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
        "file": createFile(Path.resolve(__dirname, "..", "..", "dev", "data", "microreact-project-H1mdhyO3l-data.xlsx")),
        "sheet name": "Sheet1",
        "range": "A2:",
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
        "file": createFile(Path.resolve(__dirname, "..", "..", "dev", "data", "microreact-project-H1mdhyO3l-data.xlsx")),
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

});
