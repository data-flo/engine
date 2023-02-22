import tap  from "../../utils/testing/unit";
import runAdaptor  from "../../runner/run-adaptor";
import adaptor  from "./index";
import createTmpTextFile  from "../../utils/file/tmp-text";
import createDatatable  from "../../types/datatable";






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

  tap.test("given two datatable, it should return a datatable with 4 columns", async () => {
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
      `"id","name","country","Country"
"1","Bovine","de",
"2","Gibbon","fr",
"3","Orangutan",,
"4","Gorilla",,
"5","Human","gb",
"6","Mouse","gb",
"7","Bovine",,"de"
"8","Gibbon",,"fr"
"9","Orangutan",,
"10","Gorilla",,
"11","Human",,"gb"
"12","Mouse",,"gb"
`,
    );
  });

  tap.test("given two datatable, it should return a datatable with 4 columns", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "first data": createDatatable(testCsvFilePath),
        "second data": createDatatable(testCsvFilePath2),
        "exclude unmatched columns": true,
      },
    );
    tap.ok(output.data, "adaptor should return data");
    tap.compareFile(
      output.data.getSource(),
      `"id","name"
"1","Bovine"
"2","Gibbon"
"3","Orangutan"
"4","Gorilla"
"5","Human"
"6","Mouse"
"7","Bovine"
"8","Gibbon"
"9","Orangutan"
"10","Gorilla"
"11","Human"
"12","Mouse"
`,
    );
  });

});
