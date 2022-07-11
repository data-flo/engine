const tap = require("tap");

const runAdaptor = require("../../runner/run-adaptor");
const adaptor = require("./index");
const createTmpTextFile = require("../../utils/file/tmp-text");
const createDatatable = require("../../types/datatable");

tap.test("create-map-from-datatable adaptor", async () => {
  const testCsvFilePath = await createTmpTextFile(`"id","Country","empty","date a","date b"
"Bovine","de",,"Jan 29, 2007","2007-01-28"
"Gibbon","fr",,,
"Orangutan",,,,
"Gorilla",,,,
"Human","gb",,,
"Mouse","gb",,,
`);

  tap.test("given a column in a datatable, it should return a map", async (t) => {
    const output = await runAdaptor(
      adaptor,
      {
        "data": createDatatable(testCsvFilePath),
        "key column": "id",
        "value column": "Country",
      },
    );
    t.ok(output.map, "adaptor should return map");
    const actual = output.map;
    const expected = new Map([ [ "Bovine", "de" ], [ "Gibbon", "fr" ], [ "Orangutan", "" ], [ "Gorilla", "" ], [ "Human", "gb" ], [ "Mouse", "gb" ] ]);
    t.same(actual, expected);
  });

  tap.test("given a column in a datatable, it should return a map", async (t) => {
    const output = await runAdaptor(
      adaptor,
      {
        "data": createDatatable(testCsvFilePath),
        "key column": "Country",
        "value column": "id",
      },
    );
    t.ok(output.map, "adaptor should return map");
    const actual = output.map;
    const expected = new Map([ [ "de", "Bovine" ], [ "fr", "Gibbon" ], [ "gb", "Human" ] ]);
    t.same(actual, expected);
  });

});
