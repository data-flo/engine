import tap  from "../../utils/testing/unit";
import runAdaptor  from "../../runner/run-adaptor";
import adaptor  from "./index";
import createTmpTextFile  from "../../utils/file/tmp-text";
import createDatatable  from "../../types/datatable";






tap.test("aggregate-rows adaptor", async () => {
  const testCsvFilePath = await createTmpTextFile(`"id","name","country","city"
"1","Bovine","de","berlin"
"2","Gibbon","de","berlin"
"3","Orangutan","fr",
"4","Gorilla",,
"5","Human","gb","london"
"6","Mouse","gb","manchester"
`);

  tap.test("given one column and sum aggregation, it should return a datatable with 4 row", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "data": createDatatable(testCsvFilePath),
        "group column names": [ "country" ],
        "aggregations": {
          "id": "sum",
        },
      },
    );
    tap.ok(output.data, "adaptor should return data");
    tap.compareFile(
      output.data.getSource(),
      `"country","id"\n"de","3"\n"fr","3"\n,"4"\n"gb","11"\n`,
    );
  });

  tap.test("given one column and two aggregation, it should return a datatable with 4 row", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "data": createDatatable(testCsvFilePath),
        "group column names": [ "country" ],
        "aggregations": {
          "id": "sum",
          "city": "unique-values",
        },
      },
    );
    tap.ok(output.data, "adaptor should return data");
    tap.compareFile(
      output.data.getSource(),
      `"country","id","city"\n"de","3","berlin"\n"fr","3",\n,"4",\n"gb","11","london,manchester"\n`,
    );
  });

  tap.test("given two columns and sum aggregation, it should return a datatable with 5 row", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "data": createDatatable(testCsvFilePath),
        "group column names": [ "country", "city" ],
        "aggregations": {
          "id": "sum",
        },
      },
    );
    tap.ok(output.data, "adaptor should return data");
    tap.compareFile(
      output.data.getSource(),
      `"country","city","id"\n"de","berlin","3"\n"fr",,"3"\n,,"4"\n"gb","london","5"\n"gb","manchester","6"\n`,
    );
  });

});
