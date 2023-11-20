const fs = require("fs");
const tap = require("../../utils/testing/unit");

const runAdaptor = require("../../runner/run-adaptor");

const adaptor = require("./index");
const createTmpTextFile = require("../../utils/file/tmp-text");
const createDatatable = require("../../types/datatable");

await t.test("export-to-csv-file adaptor", async () => {
  const csvText = `"id","Country","empty","date a","date b"
"Bovine","de",,"Jan 29, 2007","2007-01-28"
"Gibbon","fr",,,
"Orangutan",,,,
"Gorilla",,,,
"Human","gb",,,
"Mouse","gb",,,
`;
  const testCsvFilePath = await createTmpTextFile(csvText);

  await t.test("given a datatable, it should return a csv file", async (t) => {
    const output = await runAdaptor(
      adaptor,
      {
        "data": createDatatable(testCsvFilePath),
      },
    );
    t.ok(output.file, "adaptor should return file");
    const actual = fs.readFileSync(output.file.getSource(), "utf8");
    const expected = `"id","Country","empty","date a","date b"
"Bovine","de",,"Jan 29, 2007","2007-01-28"
"Gibbon","fr",,,
"Orangutan",,,,
"Gorilla",,,,
"Human","gb",,,
"Mouse","gb",,,
`;
    t.equal(actual, expected);
  });

  await t.test("given a datatable, it should return a csv file", async (t) => {
    const output = await runAdaptor(
      adaptor,
      {
        data: createDatatable(testCsvFilePath),
        delimiter: ";",
      },
    );
    t.ok(output.file, "adaptor should return file");
    const actual = fs.readFileSync(output.file.getSource(), "utf8");
    const expected = `\ufeff"id";"Country";"empty";"date a";"date b"
"Bovine";"de";;"Jan 29, 2007";"2007-01-28"
"Gibbon";"fr";;;
"Orangutan";;;;
"Gorilla";;;;
"Human";"gb";;;
"Mouse";"gb";;;
`;
    t.equal(actual, expected);
  });

});
