const test = require("node:test");
const assert = require("node:assert");

const { compareFile } = require("../../../utils/testing/unit.js");

const runAdaptor = require("../../../runner/run-adaptor.js");

const createTmpTextFile = require("../../../utils/file/tmp-text.js");
const createDatatable = require("../../../types/datatable.js");

const adaptor = require("../index.js");

test("select-columns adaptor", async (t) => {
  const testCsvFilePath = await createTmpTextFile(`"id","Country","empty","date a","date b"
"Bovine","de",,"Jan 29, 2007","2007-01-28"
"Gibbon","fr",,,
"Orangutan",,,,
"Gorilla",,,,
"Human","gb",,,
"Mouse","gb",,,
`);

  await t.test("given a datatable and one column, it should return a datatable", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "data": createDatatable(testCsvFilePath),
        "column names": [ "Country" ],
      },
    );
    assert.ok(output.data, "adaptor should return data");
    compareFile(
      output.data.getSource(),
      `"Country"
"de"
"fr"


"gb"
"gb"
`
    );
  });

  await t.test("given two columns in a datatable, it should return a datatable", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "data": createDatatable(testCsvFilePath),
        "column names": [ "Country", "id" ],
      },
    );
    assert.ok(output.data, "adaptor should return data");
    compareFile(
      output.data.getSource(),
      `"Country","id"
"de","Bovine"
"fr","Gibbon"
,"Orangutan"
,"Gorilla"
"gb","Human"
"gb","Mouse"
`
    );
  });

  await t.test("given two columns in a datatable and a pattern, it should return a datatable", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "data": createDatatable(testCsvFilePath),
        "column names": [ "Country", "id" ],
        "pattern": "date",
      },
    );
    assert.ok(output.data, "adaptor should return data");
    compareFile(
      output.data.getSource(),
      `"Country","id","date a","date b"
"de","Bovine","Jan 29, 2007","2007-01-28"
"fr","Gibbon",,
,"Orangutan",,
,"Gorilla",,
"gb","Human",,
"gb","Mouse",,
`
    );
  });

  await t.test("given two columns in a datatable and a pattern, it should return a datatable", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "data": createDatatable(testCsvFilePath),
        "column names": [ "id", "Country" ],
        "pattern": "/date?a?/",
      },
    );
    assert.ok(output.data, "adaptor should return data");
    compareFile(
      output.data.getSource(),
      `"id","Country","date a","date b"
"Bovine","de","Jan 29, 2007","2007-01-28"
"Gibbon","fr",,
"Orangutan",,,
"Gorilla",,,
"Human","gb",,
"Mouse","gb",,
`
    );
  });

});
