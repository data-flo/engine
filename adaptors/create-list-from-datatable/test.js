const tap = require("tap");

const runAdaptor = require("../../runner/run-adaptor");
const adaptor = require("./index");
const createTmpTextFile = require("../../utils/file/tmp-text");
const createDatatable = require("../../types/datatable");

tap.test("create-list-from-datatable adaptor", async () => {
  const testCsvFilePath = await createTmpTextFile(`"id","Country","empty","date a","date b"
"Bovine","de",,"Jan 29, 2007","2007-01-28"
"Gibbon","fr",,,
"Orangutan",,,,
"Gorilla",,,,
"Human","gb",,,
"Mouse","gb",,,
`);

  tap.test("given a column in a datatable, it should return a list of the column values", async (t) => {
    const output = await runAdaptor(
      adaptor,
      {
        "data": createDatatable(testCsvFilePath),
        "column name": "id",
      },
    );
    t.ok(output.list, "adaptor should return list");
    const actual = output.list;
    const expected = [ "Bovine", "Gibbon", "Orangutan", "Gorilla", "Human", "Mouse" ];
    t.same(actual, expected);
  });

  tap.test("given a column in a datatable, it should return a list of the column values", async (t) => {
    const output = await runAdaptor(
      adaptor,
      {
        "data": createDatatable(testCsvFilePath),
        "column name": "Country",
      },
    );
    t.ok(output.list, "adaptor should return list");
    const actual = output.list;
    const expected = [ "de", "fr", "gb", "gb" ];
    t.same(actual, expected);
  });

});
