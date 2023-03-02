const fs = require("fs");
const tap = require("../../utils/testing/unit");

const runAdaptor = require("../../runner/run-adaptor");

const adaptor = require("./index");
const createTmpTextFile = require("../../utils/file/tmp-text");
const createDatatable = require("../../types/datatable");

tap.test("export-to-google-sheet adaptor", async () => {
  const csvText = `"id","Country","empty","date a","date b"
"Bovine","de",,"Jan 29, 2007","2007-01-28"
"Gibbon","fr",,,
"Orangutan",,,,
"Gorilla",,,,
"Human","gb",,,
"Mouse","gb",,,
`;
  const testCsvFilePath = await createTmpTextFile(csvText);

  tap.test("given a datatable, it should return a csv file", async (t) => {
    const output = await runAdaptor(
      adaptor,
      {
        "data": createDatatable(testCsvFilePath),
        "url": "https://docs.google.com/spreadsheets/d/1KUbhcYUjGJCf8kMdBwuUh2VWo63oYyBDB79Gbv8G5QA/edit#gid=0",
        "id column": "id",
      },
    );
    t.ok(output.data, "adaptor should return data");
    t.ok(output["updated row ids"], "adaptor should return updated row ids");
    t.ok(output["created row ids"], "adaptor should return created row ids");
    t.ok(output["skipped row ids"], "adaptor should return skipped row ids");
  });

});
