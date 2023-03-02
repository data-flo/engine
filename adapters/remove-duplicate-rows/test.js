const tap = require("../../utils/testing/unit");

const runAdaptor = require("../../runner/run-adaptor");

const adaptor = require("./index");
const createTmpTextFile = require("../../utils/file/tmp-text");
const createDatatable = require("../../types/datatable");

tap.test("remove-duplicate-rows adaptor", async () => {
  const testCsvFilePath = await createTmpTextFile(`"id","country","year"
"Human","gb","2000"
"Gibbon","fr",
"Orangutan",,
"Gorilla",,
"Mouse","GB","2001"
"HUMAN","gb","2000"
`);

  tap.test("given id column, it should return the same datatable", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "data": createDatatable(testCsvFilePath),
        "column names": [
          "id",
        ],
      },
    );
    tap.ok(output.data, "adaptor should return data");
    tap.compareFile(
      output.data.getSource(),
      `"id","country","year"
"Human","gb","2000"
"Gibbon","fr",
"Orangutan",,
"Gorilla",,
"Mouse","GB","2001"
"HUMAN","gb","2000"
`
    );
  });

  tap.test("given no columns and case sensitive set to false, it should return 5 rows", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "data": createDatatable(testCsvFilePath),
        "case sensitive": false,
      },
    );
    tap.ok(output.data, "adaptor should return data");
    tap.compareFile(
      output.data.getSource(),
      `"id","country","year"
"Human","gb","2000"
"Gibbon","fr",
"Orangutan",,
"Gorilla",,
"Mouse","GB","2001"
`
    );
  });

  tap.test("given country column, it should return 4 rows", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "data": createDatatable(testCsvFilePath),
        "column names": [
          "country",
        ],
      },
    );
    tap.ok(output.data, "adaptor should return data");
    tap.compareFile(
      output.data.getSource(),
      `"id","country","year"
"Human","gb","2000"
"Gibbon","fr",
"Orangutan",,
"Mouse","GB","2001"
`
    );
  });

  tap.test("given country column and case sensitive set to false, it should return 3 rows", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "data": createDatatable(testCsvFilePath),
        "column names": [
          "country",
        ],
        "case sensitive": false,
      },
    );
    tap.ok(output.data, "adaptor should return data");
    tap.compareFile(
      output.data.getSource(),
      `"id","country","year"
"Human","gb","2000"
"Gibbon","fr",
"Orangutan",,
`
    );
  });

  tap.test("given id and country columns, and case sensitive set to false, it should return 5 rows", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "data": createDatatable(testCsvFilePath),
        "column names": [
          "id",
          "country",
        ],
        "case sensitive": false,
      },
    );
    tap.ok(output.data, "adaptor should return data");
    tap.compareFile(
      output.data.getSource(),
      `"id","country","year"
"Human","gb","2000"
"Gibbon","fr",
"Orangutan",,
"Gorilla",,
"Mouse","GB","2001"
`
    );
  });

});
