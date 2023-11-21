const test = require("node:test");
const assert = require("node:assert");

const { compareFile } = require("../../../utils/testing/unit.js");
const createTmpTextFile = require("../../../utils/file/tmp-text.js");
const createDatatable = require("../../../types/datatable.js");
const runAdaptor = require("../../../runner/run-adaptor.js");

const adaptor = require("../index.js");

test("convert-text-to-datatable adaptor", async (t) => {

  await t.test("given a csv text, it should return a datatable", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "csv": `"id","Country"
"Bovine","de"
"Gibbon","fr"
"Orangutan",
"Gorilla",
"Human","gb"
"Mouse","gb"
`,
      },
    );
    assert.ok(output.data, "adaptor should return data");
    compareFile(
      output.data.getSource(),
      `"id","Country"\n"Bovine","de"\n"Gibbon","fr"\n"Orangutan",\n"Gorilla",\n"Human","gb"\n"Mouse","gb"\n`,
    );
  });

  await t.test("given a csv text with semicolon, it should return a datatable", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        csv: `"id";"Country"
"Bovine";"de"
"Gibbon";"fr"
"Orangutan";
"Gorilla";
"Human";"gb"
"Mouse";"gb"
`,
        delimiter: ";",
      },
    );
    assert.ok(output.data, "adaptor should return data");
    compareFile(
      output.data.getSource(),
      `"id","Country"\n"Bovine","de"\n"Gibbon","fr"\n"Orangutan",\n"Gorilla",\n"Human","gb"\n"Mouse","gb"\n`,
    );
  });

});
