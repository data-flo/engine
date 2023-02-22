import tap  from "../../utils/testing/unit";
import runAdaptor  from "../../runner/run-adaptor";
import adaptor  from "./index";
import createTmpTextFile  from "../../utils/file/tmp-text";
import createDatatable  from "../../types/datatable";







tap.test("split-column adaptor", async () => {
  const testCsvFilePath = await createTmpTextFile(`"id","Country"
"2000|b|c","gb"
"2022|2","fr"
"2010",
"|Gorilla",
"","gb"
"|","de"
`);

  tap.test("given a datatable and two new columns, it should return a datatable", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "data": createDatatable(testCsvFilePath),
        "column name": "id",
        "separator": "|",
        "new column names": [
          "year",
          "id2",
        ],
      },
    );
    tap.ok(output.data, "adaptor should return data");
    tap.compareFile(
      output.data.getSource(),
      `"id","Country","year","id2"
"2000|b|c","gb","2000","b"
"2022|2","fr","2022","2"
"2010",,"2010",
"|Gorilla",,,"Gorilla"
,"gb",,
"|","de",,
`
    );
  });

  tap.test("given a datatable and one new, it should return a datatable", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "data": createDatatable(testCsvFilePath),
        "column name": "id",
        "separator": "|",
        "new column names": [
          "year",
        ],
      },
    );
    tap.ok(output.data, "adaptor should return data");
    tap.compareFile(
      output.data.getSource(),
      `"id","Country","year"
"2000|b|c","gb","2000"
"2022|2","fr","2022"
"2010",,"2010"
"|Gorilla",,
,"gb",
"|","de",
`
    );
  });

});
