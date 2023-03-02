const tap = require("../../utils/testing/unit");

const runAdaptor = require("../../runner/run-adaptor");
const adaptor = require("./index");
const createTmpTextFile = require("../../utils/file/tmp-text");
const createDatatable = require("../../types/datatable");

tap.test("replace-blank-values adaptor", async () => {
  const testCsvFilePath = await createTmpTextFile(
    `"id","name","country"\n"1","Bovine","de"\n"2","Gibbon","de"\n"3","Orangutan","fr"\n"4",,\n"5","Human",\n"6","Mouse","gb"\n`
  );

  tap.test("given one column, it should return a datatable without blanks", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "data": createDatatable(testCsvFilePath),
        "columns": [ "country" ],
        "new value": "n/a",
      },
    );
    tap.ok(output.data, "adaptor should return data");
    tap.compareFile(
      output.data.getSource(),
      `"id","name","country"\n"1","Bovine","de"\n"2","Gibbon","de"\n"3","Orangutan","fr"\n"4",,"n/a"\n"5","Human","n/a"\n"6","Mouse","gb"\n`
    );
  });

  tap.test("given two column, it should return a datatable without blanks", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "data": createDatatable(testCsvFilePath),
        "columns": [ "country", "name" ],
        "new value": "n/a",
      },
    );
    tap.ok(output.data, "adaptor should return data");
    tap.compareFile(
      output.data.getSource(),
      `"id","name","country"\n"1","Bovine","de"\n"2","Gibbon","de"\n"3","Orangutan","fr"\n"4","n/a","n/a"\n"5","Human","n/a"\n"6","Mouse","gb"\n`
    );
  });

});
