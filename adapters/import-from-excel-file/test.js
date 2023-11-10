const Path = require("path");

const tap = require("../../utils/testing/unit");

const runAdaptor = require("../../runner/run-adaptor");
const createFile = require("../../types/file");
const adaptor = require("./index");

tap.test("import-from-excel-file adaptor", async () => {

  tap.test("given an excel file, it should return a datatable", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "file": createFile(Path.resolve(__dirname, "..", "..", "dev", "data", "microreact-project-H1mdhyO3l-data.xlsx")),
        "sheet name": "Sheet1",
      },
    );
    tap.ok(output.data, "adaptor should return data");
    tap.compareFile(
      output.data.getSource(),
      `"a","b","c"\n"1","2","3"\n"1","2","3"\n`,
    );
  });

  tap.test("given an excel file, it should return a datatable", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "file": createFile(Path.resolve(__dirname, "..", "..", "dev", "data", "microreact-project-H1mdhyO3l-data.xlsx")),
        "sheet name": "Sheet1",
        "range": "A1:C2",
      },
    );
    tap.ok(output.data, "adaptor should return data");
    tap.compareFile(
      output.data.getSource(),
      `"a","b","c"\n"1","2","3"\n`,
    );
  });

  tap.test("given an excel file, it should return a datatable", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "file": createFile(Path.resolve(__dirname, "..", "..", "dev", "data", "microreact-project-H1mdhyO3l-data.xlsx")),
        "sheet name": "Sheet1",
        "range": "2",
      },
    );
    tap.ok(output.data, "adaptor should return data");
    tap.compareFile(
      output.data.getSource(),
      `"1","2","3"\n"1","2","3"\n`,
    );
  });

  tap.test("given an excel file, it should return a datatable", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "file": createFile(Path.resolve(__dirname, "..", "..", "dev", "data", "microreact-project-H1mdhyO3l-data.xlsx")),
        "sheet name": "Sheet1",
        "range": "B1:C3",
      },
    );
    tap.ok(output.data, "adaptor should return data");
    tap.compareFile(
      output.data.getSource(),
      `"b","c"\n"2","3"\n"2","3"\n`,
    );
  });

  tap.test("given a skip, it should return a datatable", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "file": createFile(Path.resolve(__dirname, "..", "..", "dev", "data", "microreact-project-H1mdhyO3l-data.xlsx")),
        "sheet name": "Sheet1",
        "skip": ["2"],
      },
    );
    tap.ok(output.data, "adaptor should return data");
    tap.compareFile(
      output.data.getSource(),
      `"b","c"\n"2","3"\n"2","3"\n`,
    );
  });

});
