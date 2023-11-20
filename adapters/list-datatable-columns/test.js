const tap = require("../../utils/testing/unit");

const runAdaptor = require("../../runner/run-adaptor");

const adaptor = require("./index");
const createTmpTextFile = require("../../utils/file/tmp-text");
const createDatatable = require("../../types/datatable");

await t.test("list-datatable-columns adaptor", async () => {
  const testCsvFilePath = await createTmpTextFile(`"id","Country","empty","date a","date b"
"Bovine","de",,"Jan 29, 2007","2007-01-28"
"Gibbon","fr",,,
"Orangutan",,,,
"Gorilla",,,,
"Human","gb",,,
"Mouse","gb",,,
`);

  await t.test("given a datatable, it should return a csv file", async (t) => {
    const output = await runAdaptor(
      adaptor,
      {
        data: createDatatable(testCsvFilePath),
      },
    );
    t.ok(output["column names"], "adaptor should return column names");
    const actual = output["column names"];
    const expected = [ "id", "Country", "empty", "date a", "date b" ];
    t.same(actual, expected);
  });

});
