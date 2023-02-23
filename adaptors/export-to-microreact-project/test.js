const tap = require("../../utils/testing/unit");

const runAdaptor = require("../../runner/run-adaptor");
const adaptor = require("./index");
const createTmpTextFile = require("../../utils/file/tmp-text");
const createFile = require("../../types/file");

tap.test("export-to-microreact-project adaptor", async () => {
  const csvText = `"id","Country","empty","date a","date b"
  "Bovine","de",,"Jan 29, 2007","2007-01-28"
  "Gibbon","fr",,,
  "Orangutan",,,,
  "Gorilla",,,,
  "Human","gb",,,
  "Mouse","gb",,,
  `;
  const testCsvFilePath = await createTmpTextFile(csvText);

  tap.test("given a project, it should return a datatable", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "data file": createFile(testCsvFilePath),
        "access token": process.env.MICROREACT_ACCESS_TOKEN,
      },
    );
    tap.ok(output.id, "adaptor should return id");
    tap.ok(output.url, "adaptor should return url");
    console.log(output);
  });

});
