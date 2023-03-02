const tap = require("../../utils/testing/unit");

const runAdaptor = require("../../runner/run-adaptor");
const adaptor = require("./index");
const createTmpTextFile = require("../../utils/file/tmp-text");
const createDatatable = require("../../types/datatable");

tap.test("join-datatables adaptor", async () => {
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
"us","USA"
"it","Italy"
`);

  tap.test("given two datatables, it should return a datatable with left join", async () => {
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
"Mouse","GB","gb","UK"
`
    );
  });

  tap.test("given two datatables and case sensitive set to true, it should return a datatable with left join", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "main data": createDatatable(leftCsvFilePath),
        "main column": "Country",
        "other data": createDatatable(rightCsvFilePath),
        "other column": "code",
        "case sensitive": true,
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
"Mouse","GB",,
`
    );
  });

  tap.test("given two datatables, it should return a datatable with inner join", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "main data": createDatatable(leftCsvFilePath),
        "main column": "Country",
        "other data": createDatatable(rightCsvFilePath),
        "other column": "code",
        "join type": "Inner Join",
      },
    );
    tap.ok(output.data, "adaptor should return data");
    tap.compareFile(
      output.data.getSource(),
      `"id","Country","code","name"
"Bovine","de","de","Germany"
"Gibbon","fr","fr","France"
"Human","gb","gb","UK"
"Mouse","GB","gb","UK"
`
    );
  });

  tap.test("given two datatables, it should return a datatable with full join", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "main data": createDatatable(leftCsvFilePath),
        "main column": "Country",
        "other data": createDatatable(rightCsvFilePath),
        "other column": "code",
        "join type": "Full Join",
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
"Mouse","GB","gb","UK"
,,"us","USA"
,,"it","Italy"
`
    );
  });

  tap.test("given two datatables and prefix, it should return a datatable with left join", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "main data": createDatatable(leftCsvFilePath),
        "main column": "Country",
        "other data": createDatatable(rightCsvFilePath),
        "other column": "code",
        "prefix": "country.",
      },
    );
    tap.ok(output.data, "adaptor should return data");
    tap.compareFile(
      output.data.getSource(),
      `"id","Country","country.code","country.name"
"Bovine","de","de","Germany"
"Gibbon","fr","fr","France"
"Orangutan",,,
"Gorilla",,,
"Human","gb","gb","UK"
"Mouse","GB","gb","UK"
`
    );
  });

});
