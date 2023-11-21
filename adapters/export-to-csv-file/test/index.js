const test = require("node:test");
const assert = require("node:assert");

const { compareFile } = require("../../../utils/testing/unit.js");
const createTmpTextFile = require("../../../utils/file/tmp-text.js");
const createDatatable = require("../../../types/datatable.js");
const runAdaptor = require("../../../runner/run-adaptor.js");

const adaptor = require("../index.js");

test("export-to-csv-file adaptor", async (t) => {
  const csvText = `"id","Country","empty","date a","date b"
"Bovine","de",,"Jan 29, 2007","2007-01-28"
"Gibbon","fr",,,
"Orangutan",,,,
"Gorilla",,,,
"Human","gb",,,
"Mouse","gb",,,
`;
  const testCsvFilePath = await createTmpTextFile(csvText);

  await t.test("given a datatable, it should return a csv file", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "data": createDatatable(testCsvFilePath),
      },
    );
    assert.ok(output.file, "adaptor should return file");
    compareFile(
      output.file.getSource(),
      `"id","Country","empty","date a","date b"
"Bovine","de",,"Jan 29, 2007","2007-01-28"
"Gibbon","fr",,,
"Orangutan",,,,
"Gorilla",,,,
"Human","gb",,,
"Mouse","gb",,,
`
    );
  });

  await t.test("given a datatable, it should return a csv file", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        data: createDatatable(testCsvFilePath),
        delimiter: ";",
      },
    );
    assert.ok(output.file, "adaptor should return file");
    compareFile(
      output.file.getSource(),
      `"id";"Country";"empty";"date a";"date b"
"Bovine";"de";;"Jan 29, 2007";"2007-01-28"
"Gibbon";"fr";;;
"Orangutan";;;;
"Gorilla";;;;
"Human";"gb";;;
"Mouse";"gb";;;
`
    );
  });

});
