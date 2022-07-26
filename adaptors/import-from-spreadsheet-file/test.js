const tap = require("../../utils/testing/unit");

const runAdaptor = require("../../runner/run-adaptor");
const adaptor = require("./index");
const createFile = require("../../types/file");

tap.test("import-from-spreadsheet-file adaptor", async () => {

  tap.test("given a csv text, it should return a datatable", async () => {

    const output = await runAdaptor(
      adaptor,
      {
        "file": createFile("/Users/ka10/code/microreact/data/projects/sa15 - ecoli/microreact-project-H1mdhyO3l-data.xlsx"),
        "sheetname": "Sheet1",
      },
    );
    tap.ok(output.data, "adaptor should return data");
    tap.compareFile(
      output.data.getSource(),
      `"a","b"\n"1","2"\n`,
    );
  });

});
