const tap = require("../../utils/testing/unit");
const fs = require("fs");

const adaptor = require("./index");
const createTmpTextFile = require("../../utils/file/tmp-text");
const createDatatable = require("../../types/datatable");

tap.test("add-column adaptor", async () => {
  const testCsvFilePath = await createTmpTextFile(`"id","Country","empty","date a","date b"
"Bovine","de",,"Jan 29, 2007","2007-01-28"
"Gibbon","fr",,,
"Orangutan",,,,
"Gorilla",,,,
"Human","gb",,,
"Mouse","gb",,,
`);

  tap.test("given a datatable, it should add a column", async (t) => {
    const output = await adaptor({
      data: createDatatable(testCsvFilePath),
      column: "ones",
      value: "1",
    });
    t.ok(output.data);
    const actual = fs.readFileSync(output.data.getSource(), "utf8");
    const expected = `"id","Country","empty","date a","date b","ones"
"Bovine","de",,"Jan 29, 2007","2007-01-28","1"
"Gibbon","fr",,,,"1"
"Orangutan",,,,,"1"
"Gorilla",,,,,"1"
"Human","gb",,,,"1"
"Mouse","gb",,,,"1"
`;
    t.equal(actual, expected);
  });

  tap.test("given no value, it should add an empty column", async (t) => {
    const output = await adaptor({
      data: createDatatable(testCsvFilePath),
      column: "ones",
    });
    t.ok(output.data);
    const actual = fs.readFileSync(output.data.getSource(), "utf8");
    const expected = `"id","Country","empty","date a","date b","ones"
"Bovine","de",,"Jan 29, 2007","2007-01-28",
"Gibbon","fr",,,,
"Orangutan",,,,,
"Gorilla",,,,,
"Human","gb",,,,
"Mouse","gb",,,,
`;
    t.equal(actual, expected);
  });

  tap.test("given an existing column, it should throw an error", async (t) => {
    await t.rejects(
      adaptor({
        data: createDatatable(testCsvFilePath),
        column: "id",
      }),
      new Error("Datatable already includes a column named id"),
    );
  });

});