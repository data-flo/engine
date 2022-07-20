const tap = require("../../utils/testing/unit");

const runAdaptor = require("../../runner/run-adaptor");

const adaptor = require("./index");
const createTmpTextFile = require("../../utils/file/tmp-text");
const createDatatable = require("../../types/datatable");

tap.test("rename-columns adaptor", async () => {
  const testCsvFilePath = await createTmpTextFile(`"id","Country","empty","date a","date b"
"Bovine","de",,"Jan 29, 2007","2007-01-28"
"Gibbon","fr",,,
"Orangutan",,,,
"Gorilla",,,,
"Human","gb",,,
"Mouse","gb",,,
`);

  tap.test("given a datatable and one column, it should a datatable", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "data": createDatatable(testCsvFilePath),
        "column names": new Map([
          [ "empty", "blank" ],
          [ "id", "Sample" ],
        ]),
      },
    );
    tap.ok(output.data, "adaptor should return column names");
    tap.compareFile(
      output.data.getSource(),
      `"Sample","Country","blank","date a","date b"
"Bovine","de",,"Jan 29, 2007","2007-01-28"
"Gibbon","fr",,,
"Orangutan",,,,
"Gorilla",,,,
"Human","gb",,,
"Mouse","gb",,,
`
    );
  });

  tap.test("given a datatable and one column, it should a datatable", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "data": createDatatable(testCsvFilePath),
        "column names": new Map([
          [ "empty", "blank" ],
          [ "id", "Sample" ],
        ]),
        "discard unmapped": true,
      },
    );
    tap.ok(output.data, "adaptor should return column names");
    tap.compareFile(
      output.data.getSource(),
      `"Sample","blank"
"Bovine",
"Gibbon",
"Orangutan",
"Gorilla",
"Human",
"Mouse",
`
    );
  });

});
