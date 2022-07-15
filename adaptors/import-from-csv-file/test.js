const fs = require("fs");
const tap = require("../../utils/testing/unit");

const runAdaptor = require("../../runner/run-adaptor");
const adaptor = require("./index");
const compareFileContent = require("../../utils/file/compare");
const createTmpTextFile = require("../../utils/file/tmp-text");
const createDatatable = require("../../types/datatable");

tap.test("import-csv-file adaptor", async () => {

  tap.test("given a csv text, it should return a databale", async (t) => {
    const testCsvFilePath = await createTmpTextFile(`"id","Country"
"Bovine","de"
"Gibbon","fr"
"Orangutan",
"Gorilla",
"Human","gb"
"Mouse","gb"
`);

    const output = await runAdaptor(
      adaptor,
      {
        csv: createDatatable(testCsvFilePath),
      },
    );
    t.ok(output.data, "adaptor should return data");
    t.ok(
      compareFileContent(
        output.data.getSource(),
        `"id","Country"\n"Bovine","de"\n"Gibbon","fr"\n"Orangutan",\n"Gorilla",\n"Human","gb"\n"Mouse","gb"\n`,
      )
    );
  });

  tap.test("given a csv text with semicolon, it should return a databale", async (t) => {
    const testCsvFilePath = await createTmpTextFile(`"id","Country"
"Bovine","de"
"Gibbon","fr"
"Orangutan",
"Gorilla",
"Human","gb"
"Mouse","gb"
`);

    const output = await runAdaptor(
      adaptor,
      {
        csv: createDatatable(testCsvFilePath),
        delimiter: ";",
      },
    );
    t.ok(output.data, "adaptor should return data");
    t.ok(
      compareFileContent(
        output.data.getSource(),
        `"id","Country"\n"Bovine","de"\n"Gibbon","fr"\n"Orangutan",\n"Gorilla",\n"Human","gb"\n"Mouse","gb"\n`,
      )
    );
  });

});
