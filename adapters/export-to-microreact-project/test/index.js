const test = require("node:test");
const assert = require("node:assert");

const createTmpTextFile = require("../../../utils/file/tmp-text.js");
const runAdaptor = require("../../../runner/run-adaptor.js");
const createFile = require("../../../types/file.js");

const adaptor = require("../index.js");

test("export-to-microreact-project adaptor", async (t) => {
  assert.ok(process.env.MICROREACT_ACCESS_TOKEN, "MICROREACT_ACCESS_TOKEN is missing from env");

  const csvText = `"id","Country","empty","date a","date b"
  "Bovine","de",,"Jan 29, 2007","2007-01-28"
  "Gibbon","fr",,,
  "Orangutan",,,,
  "Gorilla",,,,
  "Human","gb",,,
  "Mouse","gb",,,
  `;
  const testCsvFilePath = await createTmpTextFile(csvText);

  await t.test("given a project, it should return a datatable", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "data file": createFile(testCsvFilePath),
        "access token": process.env.MICROREACT_ACCESS_TOKEN,
      },
    );
    assert.ok(output.id, "adaptor should return id");
    assert.ok(output.url, "adaptor should return url");
  });

});
