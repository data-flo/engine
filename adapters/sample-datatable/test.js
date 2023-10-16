const tap = require("../../utils/testing/unit.js");

const runAdaptor = require("../../runner/run-adaptor.js");
const createTmpTextFile = require("../../utils/file/tmp-text.js");
const createDatatable = require("../../types/datatable.js");

const adaptor = require("./index.js");

tap.test("sample-datatable adaptor", async () => {
  const testCsvFilePath = await createTmpTextFile(`"id","Country","num"
"Bovine","de","1"
"Gibbon","fr","1"
"Orangutan",,"0"
"Gorilla","gb","-2"
"Human","gb","0x"
"Mouse","GB",
`);

  tap.test("given a datatable, it should return the first 100 rows", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "data": createDatatable(testCsvFilePath),
      },
    );
    tap.ok(output["sample data"], "adaptor should return data");
    tap.compareFile(
      output["sample data"].getSource(),
      `"id","Country","num"
"Bovine","de","1"
"Gibbon","fr","1"
"Orangutan",,"0"
"Gorilla","gb","-2"
"Human","gb","0x"
"Mouse","GB",
`,
    );
  });

  tap.test("given a sample size of 2, it should return 2 rows", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "data": createDatatable(testCsvFilePath),
        "sample size": "2",
      },
    );
    tap.ok(output["sample data"], "adaptor should return data");
    tap.compareFile(
      output["sample data"].getSource(),
      `"id","Country","num"
"Bovine","de","1"
"Gibbon","fr","1"
`
    );
  });

});
