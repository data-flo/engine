import tap  from "../../utils/testing/unit";
import runAdaptor  from "../../runner/run-adaptor";
import adaptor  from "./index";
import createTmpTextFile  from "../../utils/file/tmp-text";
import createDatatable  from "../../types/datatable";







tap.test("select-columns adaptor", async () => {
  const testCsvFilePath = await createTmpTextFile(`"id","Country","empty","date a","date b"
"Bovine","de",,"Jan 29, 2007","2007-01-28"
"Gibbon","fr",,,
"Orangutan",,,,
"Gorilla",,,,
"Human","gb",,,
"Mouse","gb",,,
`);

  tap.test("given a datatable and one column, it should return a datatable", async (t) => {
    const output = await runAdaptor(
      adaptor,
      {
        "data": createDatatable(testCsvFilePath),
        "column names": [ "Country" ],
      },
    );
    t.ok(output.data, "adaptor should return data");
    tap.compareFile(
      output.data.getSource(),
      `"Country"
"de"
"fr"


"gb"
"gb"
`
    );
  });

  tap.test("given two columns in a datatable, it should return a datatable", async (t) => {
    const output = await runAdaptor(
      adaptor,
      {
        "data": createDatatable(testCsvFilePath),
        "column names": [ "Country", "id" ],
      },
    );
    t.ok(output.data, "adaptor should return data");
    tap.compareFile(
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

  tap.test("given two columns in a datatable and a pattern, it should return a datatable", async (t) => {
    const output = await runAdaptor(
      adaptor,
      {
        "data": createDatatable(testCsvFilePath),
        "column names": [ "Country", "id" ],
        "pattern": "date",
      },
    );
    t.ok(output.data, "adaptor should return data");
    tap.compareFile(
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

  tap.test("given two columns in a datatable and a pattern, it should return a datatable", async (t) => {
    const output = await runAdaptor(
      adaptor,
      {
        "data": createDatatable(testCsvFilePath),
        "column names": [ "Country", "id" ],
        "pattern": "/date?a?/",
      },
    );
    t.ok(output.data, "adaptor should return data");
    tap.compareFile(
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
