const tap = require("../../utils/testing/unit");

const runAdaptor = require("../../runner/run-adaptor");

const adaptor = require("./index");
const createTmpTextFile = require("../../utils/file/tmp-text");
const createDatatable = require("../../types/datatable");

tap.test("remove-columns adaptor", async () => {
  const testCsvFilePath = await createTmpTextFile(`"id","Country","empty","date a","date b"
"Bovine","de",,"Jan 29, 2007","2007-01-28"
"Gibbon","fr",,,
"Orangutan",,,,
"Gorilla",,,,
"Human","gb",,,
"Mouse","gb",,,
`);

  tap.test("given a datatable and one column, it should return a datatable", async (t) => {
    const output = await runAdaptor(
      adaptor,
      {
        "data": createDatatable(testCsvFilePath),
        "columns": [ "id", "empty", "date a", "date b" ],
      },
    );
    t.ok(output.data, "adaptor should return data");
    tap.compareFile(
      output.data.getSource(),
      `"Country"
"de"
"fr"


"gb"
"gb"
`
    );
  });

  tap.test("given a datatable and two column, it should return a datatable", async (t) => {
    const output = await runAdaptor(
      adaptor,
      {
        "data": createDatatable(testCsvFilePath),
        "columns": [ "empty", "date a", "date b" ],
      },
    );
    t.ok(output.data, "adaptor should return data");
    tap.compareFile(
      output.data.getSource(),
      `"id","Country"
"Bovine","de"
"Gibbon","fr"
"Orangutan",
"Gorilla",
"Human","gb"
"Mouse","gb"
`
    );
  });

});