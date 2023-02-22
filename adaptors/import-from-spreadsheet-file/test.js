import { fileURLToPath } from "url";
import { dirname } from "path";
const __dirname = dirname(fileURLToPath(import.meta.url));
import Path  from "path";
import tap  from "../../utils/testing/unit";
import runAdaptor  from "../../runner/run-adaptor";
import adaptor  from "./index";
import createFile  from "../../types/file";
/* eslint-disable quotes */









tap.test("import-from-excel-file adaptor", async () => {

  tap.test("given an excel file, it should return a datatable", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "file": createFile(Path.resolve(__dirname, "..", "..", "dev", "data", "microreact-project-H1mdhyO3l-data.xlsx")),
        "sheetname": "Sheet1",
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
        "sheetname": "Sheet1",
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
        "sheetname": "Sheet1",
        "range": "A2:",
      },
    );
    tap.ok(output.data, "adaptor should return data");
    tap.compareFile(
      output.data.getSource(),
      `"1","2","3"\n"1","2","3"\n`,
    );
  });

  tap._test("given an excel file, it should return a datatable", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "file": createFile(Path.resolve(__dirname, "..", "..", "dev", "data", "microreact-project-H1mdhyO3l-data.xlsx")),
        "sheetname": "Sheet1",
        "range": "B1:C3",
      },
    );
    tap.ok(output.data, "adaptor should return data");
    tap.compareFile(
      output.data.getSource(),
      `"b","c"\n"2","3"\n"2","3"\n`,
    );
  });

});
