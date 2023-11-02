const tap = require("../../utils/testing/unit");

const runAdaptor = require("../../runner/run-adaptor");
const adaptor = require("./index");
const createTmpTextFile = require("../../utils/file/tmp-text");
const createDatatable = require("../../types/datatable");

tap.test("filter-rows adaptor", async () => {
  const testCsvFilePath = await createTmpTextFile(`"id","Country","num"
"Bovine","de","1"
"Gibbon","fr","1"
"Orangutan",,"0"
"Gorilla","gb","-2"
"Human","gb","0x"
"Mouse","GB",
`);

  tap.test("given a column in a datatable, it should return 2 rows", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "data": createDatatable(testCsvFilePath),
        "column name": "Country",
        "filter type": "equals",
        "filter value": "gb",
        "case sensitive": "true",
      },
    );
    tap.ok(output.data, "adaptor should return data");
    tap.ok(output.complementary, "adaptor should return complementary");
    tap.compareFile(
      output.data.getSource(),
      `"id","Country","num"\n"Gorilla","gb","-2"\n"Human","gb","0x"\n`
    );
    tap.compareFile(
      output.complementary.getSource(),
      `"id","Country","num"\n"Bovine","de","1"\n"Gibbon","fr","1"\n"Orangutan",,"0"\n"Mouse","GB",\n`
    );
  });

  tap.test("given a column in a datatable and case sensitive set to false, it should return 3 rows", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "data": createDatatable(testCsvFilePath),
        "column name": "Country",
        "filter type": "equals",
        "filter value": "gb",
        "case sensitive": false,
      },
    );
    tap.ok(output.data, "adaptor should return data");
    tap.ok(output.complementary, "adaptor should return complementary");
    tap.compareFile(
      output.data.getSource(),
      `"id","Country","num"\n"Gorilla","gb","-2"\n"Human","gb","0x"\n"Mouse","GB",\n`
    );
    tap.compareFile(
      output.complementary.getSource(),
      `"id","Country","num"\n"Bovine","de","1"\n"Gibbon","fr","1"\n"Orangutan",,"0"\n`
    );
  });

  tap.test("given greater-than 1 filter, it should return 2 rows", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "data": createDatatable(testCsvFilePath),
        "column name": "num",
        "filter type": "greater-than",
        "filter value": "0",
      },
    );
    tap.ok(output.data, "adaptor should return data");
    tap.ok(output.complementary, "adaptor should return complementary");
    tap.compareFile(
      output.data.getSource(),
      `"id","Country","num"\n"Bovine","de","1"\n"Gibbon","fr","1"\n`
    );
    tap.compareFile(
      output.complementary.getSource(),
      `"id","Country","num"\n"Orangutan",,"0"\n"Gorilla","gb","-2"\n"Human","gb","0x"\n"Mouse","GB",\n`
    );
  });

  tap.test("given greater-than-or-equal 1 filter, it should return 3 rows", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "data": createDatatable(testCsvFilePath),
        "column name": "num",
        "filter type": "greater-than-or-equal",
        "filter value": "0",
      },
    );
    tap.ok(output.data, "adaptor should return data");
    tap.ok(output.complementary, "adaptor should return complementary");
    tap.compareFile(
      output.data.getSource(),
      `"id","Country","num"\n"Bovine","de","1"\n"Gibbon","fr","1"\n"Orangutan",,"0"\n`
    );
    tap.compareFile(
      output.complementary.getSource(),
      `"id","Country","num"\n"Gorilla","gb","-2"\n"Human","gb","0x"\n"Mouse","GB",\n`
    );
  });

  tap.test("given a column with number/letter data, it should filter on numbers only", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "data": createDatatable(testCsvFilePath),
        "column name": "num",
        "filter type": "is-number",
      },
    );
    tap.ok(output.data, "adaptor should return data");
    tap.ok(output.complementary, "adaptor should return complementary");
    tap.compareFile(
      output.data.getSource(),
      `"id","Country","num"\n"Bovine","de","1"\n"Gibbon","fr","1"\n"Orangutan",,"0"\n"Gorilla","gb","-2"\n`
    );
    tap.compareFile(
      output.complementary.getSource(),
      `"id","Country","num"\n"Human","gb","0x"\n"Mouse","GB",\n`
    );
  });
  tap.test("given a column with number/letter data, it should filter on data thats not a number", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "data": createDatatable(testCsvFilePath),
        "column name": "num",
        "filter type": "not-number",
      },
    );
    tap.ok(output.data, "adaptor should return data");
    tap.ok(output.complementary, "adaptor should return complementary");
    tap.compareFile(
      output.data.getSource(),
      `"id","Country","num"\n"Human","gb","0x"\n"Mouse","GB",\n`
    );
    tap.compareFile(
      output.complementary.getSource(),
      `"id","Country","num"\n"Bovine","de","1"\n"Gibbon","fr","1"\n"Orangutan",,"0"\n"Gorilla","gb","-2"\n`
    );
  });

});
