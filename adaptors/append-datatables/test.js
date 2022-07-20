const tap = require("../../utils/testing/unit");

const runAdaptor = require("../../runner/run-adaptor");
const adaptor = require("./index");
const createTmpTextFile = require("../../utils/file/tmp-text");
const createDatatable = require("../../types/datatable");

tap.test("append-datatables adaptor", async () => {
  const testCsvFilePath = await createTmpTextFile(`"id","name","country"
"1","Bovine","de"
"2","Gibbon","fr"
"3","Orangutan",
"4","Gorilla",
"5","Human","gb"
"6","Mouse","gb"
`);

  const testCsvFilePath2 = await createTmpTextFile(`"id","name","Country"
"7","Bovine","de"
"8","Gibbon","fr"
"9","Orangutan",
"10","Gorilla",
"11","Human","gb"
"12","Mouse","gb"
`);

  tap.test("given a column in a datatable, it should return a database with the duplicated column", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "first data": createDatatable(testCsvFilePath),
        "second data": createDatatable(testCsvFilePath2),
      },
    );
    tap.ok(output.data, "adaptor should return data");
    tap.compareFile(
      output.data.getSource(),
      `"id","name","country"
"1","Bovine","de"
"2","Gibbon","fr"
"3","Orangutan",
"4","Gorilla",
"5","Human","gb"
"6","Mouse","gb"
"7","Bovine","de"
"8","Gibbon","fr"
"9","Orangutan",
"10","Gorilla",
"11","Human","gb"
"12","Mouse","gb"
`,
    );
  });

});
