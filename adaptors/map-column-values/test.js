import tap  from "../../utils/testing/unit";
import runAdaptor  from "../../runner/run-adaptor";
import adaptor  from "./index";
import createTmpTextFile  from "../../utils/file/tmp-text";
import createDatatable  from "../../types/datatable";







tap.test("map-column-values adaptor", async () => {
  const testCsvFilePath = await createTmpTextFile(`"id","Country"
"Bovine","de"
"Gibbon","fr"
"Orangutan",
"Gorilla",
"Human","gb"
"Mouse","GB"
`);

  tap.test("given a datatable and original column, it should write results to the same original column", async (t) => {
    const output = await runAdaptor(
      adaptor,
      {
        "data": createDatatable(testCsvFilePath),
        "original column": "Country",
        "values": [
          [ "de", "Germany" ],
          [ "fr", "France" ],
          [ "gb", "UK" ],
        ],
        "case sensitive": false,
      },
    );
    t.ok(output.data, "adaptor should return data");
    tap.compareFile(
      output.data.getSource(),
      `"id","Country"
"Bovine","Germany"
"Gibbon","France"
"Orangutan",
"Gorilla",
"Human","UK"
"Mouse","UK"
`
    );
  });

  tap.test("given a datatable, original column and case sensitive, it should write results to the same original column", async (t) => {
    const output = await runAdaptor(
      adaptor,
      {
        "data": createDatatable(testCsvFilePath),
        "original column": "Country",
        "values": [
          [ "de", "Germany" ],
          [ "fr", "France" ],
          [ "gb", "UK" ],
        ],
        "case sensitive": true,
      },
    );
    t.ok(output.data, "adaptor should return data");
    tap.compareFile(
      output.data.getSource(),
      `"id","Country"
"Bovine","Germany"
"Gibbon","France"
"Orangutan",
"Gorilla",
"Human","UK"
"Mouse",
`
    );
  });

  tap.test("given a datatable, original column and include unmapped values, it should write results to the same original column", async (t) => {
    const output = await runAdaptor(
      adaptor,
      {
        "data": createDatatable(testCsvFilePath),
        "original column": "Country",
        "values": [
          [ "de", "Germany" ],
          [ "fr", "France" ],
          [ "gb", "UK" ],
        ],
        "case sensitive": true,
        "unmapped values": "include",
      },
    );
    t.ok(output.data, "adaptor should return data");
    tap.compareFile(
      output.data.getSource(),
      `"id","Country"
"Bovine","Germany"
"Gibbon","France"
"Orangutan",
"Gorilla",
"Human","UK"
"Mouse","GB"
`
    );
  });

  tap.test("given a datatable and original column, it should write results to the same original column", async (t) => {
    const output = await runAdaptor(
      adaptor,
      {
        "data": createDatatable(testCsvFilePath),
        "original column": "Country",
        "new column": "Country Name",
        "values": [
          [ "de", "Germany" ],
          [ "fr", "France" ],
          [ "gb", "UK" ],
        ],
        "case sensitive": true,
      },
    );
    t.ok(output.data, "adaptor should return data");
    tap.compareFile(
      output.data.getSource(),
      `"id","Country","Country Name"
"Bovine","de","Germany"
"Gibbon","fr","France"
"Orangutan",,
"Gorilla",,
"Human","gb","UK"
"Mouse","GB",
`
    );
  });

});
