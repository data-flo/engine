const test = require("node:test");
const assert = require("node:assert");
const rbql = require("rbql");

const { compareFile } = require("../../../utils/testing/unit.js");
const runAdaptor = require("../../../runner/run-adaptor.js");
const adaptor = require("../index.js");
const createTmpTextFile = require("../../../utils/file/tmp-text.js");
const createDatatable = require("../../../types/datatable.js");

test("aggregate-rows adaptor", async (t) => {
  const testCsvFilePath = await createTmpTextFile(`"id","name","country","city"
"1","Bovine","de","berlin"
"2","Gibbon","de","berlin"
"3","Orangutan","fr",
"4","Gorilla",,
"5","Human","gb","london"
"6","Mouse","gb","manchester"
`);

  const warnings = [];

  rbql.query_csv(
    `select 1`,
    "/Users/ka10/code/data-flo/studio/engine/dev/data/amr-watch-metadata/mini.csv",
    ",",
    "quoted",
    "out.csv",
    ",",
    "quoted",
    "utf-8",
    warnings,
    true /* with_headers */,
  );

});
