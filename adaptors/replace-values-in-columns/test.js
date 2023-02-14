const tap = require("../../utils/testing/unit");

const runAdaptor = require("../../runner/run-adaptor");
const adaptor = require("./index");
const createTmpTextFile = require("../../utils/file/tmp-text");
const createDatatable = require("../../types/datatable");

tap.test("replace-values-in-columns adaptor", async () => {
  const testCsvFilePath = await createTmpTextFile(
    `"id","name","country"\n"1","Bovine","de"\n"2","Gibbon","de"\n"3","Orangutan","fr"\n"4",,\n"5","Human",\n"6","Mouse","gb"\n`
  );

  tap.test("given one column, it should return a datatable with replaced values", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "data": createDatatable(testCsvFilePath),
        "columns": [ [ "country" ] ],
        "pattern": "/^$/",
        "replacement": "n/a",
      },
    );
    tap.ok(output.data, "adaptor should return data");
    tap.compareFile(
      output.data.getSource(),
      `"id","name","country"\n"1","Bovine","de"\n"2","Gibbon","de"\n"3","Orangutan","fr"\n"4",,"n/a"\n"5","Human","n/a"\n"6","Mouse","gb"\n`
    );
  });

  tap.test("given one column, it should return a datatable with replaced values", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "data": createDatatable(testCsvFilePath),
        "columns": [ [ "country", "new country" ] ],
        "pattern": "/^$/",
        "replacement": "n/a",
      },
    );
    tap.ok(output.data, "adaptor should return data");
    tap.compareFile(
      output.data.getSource(),
      `"id","name","country","new country"\n"1","Bovine","de","de"\n"2","Gibbon","de","de"\n"3","Orangutan","fr","fr"\n"4",,,"n/a"\n"5","Human",,"n/a"\n"6","Mouse","gb","gb"\n`
    );
  });

  tap.test("given two column, it should return a datatable with replaced values", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "data": createDatatable(testCsvFilePath),
        "columns": [ ["country"], ["name"] ],
        "pattern": "/^$/",
        "replacement": "n/a",
      },
    );
    tap.ok(output.data, "adaptor should return data");
    tap.compareFile(
      output.data.getSource(),
      `"id","name","country"\n"1","Bovine","de"\n"2","Gibbon","de"\n"3","Orangutan","fr"\n"4","n/a","n/a"\n"5","Human","n/a"\n"6","Mouse","gb"\n`
    );
  });

});
