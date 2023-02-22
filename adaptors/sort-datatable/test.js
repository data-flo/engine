import tap  from "../../utils/testing/unit";
import runAdaptor  from "../../runner/run-adaptor";
import adaptor  from "./index";
import createTmpTextFile  from "../../utils/file/tmp-text";
import createDatatable  from "../../types/datatable";







tap.test("select-rows adaptor", async () => {
  const testCsvFilePath = await createTmpTextFile(`"id","Country","empty","date a","date b"
"Human","gb",,,
"Gibbon","fr",,,
"Orangutan",,,,
"Gorilla",,,,
"Mouse","gb",,,
"Bovine","de",,"Jan 29, 2007","2007-01-28"
`);

  tap.test("given a datatable and one column, it should return a datatable", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "data": createDatatable(testCsvFilePath),
        "column names": [
          [ "id", "asc" ],
        ],
      },
    );
    tap.ok(output.data, "adaptor should return data");
    tap.compareFile(
      output.data.getSource(),
      `"id","Country","empty","date a","date b"
"Bovine","de",,"Jan 29, 2007","2007-01-28"
"Gibbon","fr",,,
"Gorilla",,,,
"Human","gb",,,
"Mouse","gb",,,
"Orangutan",,,,
`
    );
  });

  tap.test("given a datatable and two columns, it should return a datatable", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "data": createDatatable(testCsvFilePath),
        "column names": [
          [ "Country", "asc" ],
          [ "id", "desc" ],
        ],
      },
    );
    tap.ok(output.data, "adaptor should return data");
    tap.compareFile(
      output.data.getSource(),
      `"id","Country","empty","date a","date b"
"Orangutan",,,,
"Gorilla",,,,
"Bovine","de",,"Jan 29, 2007","2007-01-28"
"Gibbon","fr",,,
"Mouse","gb",,,
"Human","gb",,,
`
    );
  });

  tap.test("given a datatable and two columns, it should return a datatable", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "data": createDatatable(testCsvFilePath),
        "column names": [
          [ "id", "desc" ],
          [ "Country", "asc" ],
        ],
      },
    );
    tap.ok(output.data, "adaptor should return data");
    tap.compareFile(
      output.data.getSource(),
      `"id","Country","empty","date a","date b"
"Orangutan",,,,
"Mouse","gb",,,
"Human","gb",,,
"Gorilla",,,,
"Gibbon","fr",,,
"Bovine","de",,"Jan 29, 2007","2007-01-28"
`
    );
  });

});
