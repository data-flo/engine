const fs = require("fs");

const tap = require("../../utils/testing/unit");

const runAdaptor = require("../../runner/run-adaptor");
const adaptor = require("./index");
const createTmpTextFile = require("../../utils/file/tmp-text");
const createDatatable = require("../../types/datatable");

tap.test("duplicate-column adaptor", async () => {
  const leftCsvFilePath = await createTmpTextFile(`"id","Country"
"Bovine","de"
"Gibbon","fr"
"Orangutan",
"Gorilla",
"Human","gb"
"Mouse","GB"
`);
  const rightCsvFilePath = await createTmpTextFile(`"code","name"
"de","Germany"
"fr","France"
"gb","UK"
`);

  tap.test("given a column in a datatable, it should return a database with the duplicated column", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "main data": createDatatable(leftCsvFilePath),
        "main column": "Country",
        "other data": createDatatable(rightCsvFilePath),
        "other column": "code",
      },
    );
    tap.ok(output.data, "adaptor should return data");
    tap.compareFile(
      output.data.getSource(),
      `"id","Country","code","name"
"Bovine","de","de","Germany"
"Gibbon","fr","fr","France"
"Orangutan",,,
"Gorilla",,,
"Human","gb","gb","UK"
"Mouse","gb",,
`
    );
  });

});
