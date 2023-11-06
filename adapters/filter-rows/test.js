const assert = require("node:assert");
const test = require("node:test");
const { compareFile } = require("../../utils/testing/unit.js");
const createTmpTextFile = require("../../utils/file/tmp-text.js");
const createDatatable = require("../../types/datatable.js");
const adaptor = require("./index.js");

test("filter-rows adaptor", async (t) => {
  const testCsvFilePath = await createTmpTextFile(`"id","Country","num"
"Bovine","de","1"
"Gibbon","fr","1"
"Orangutan",,"0"
"Gorilla","gb","-2"
"Human","gb","0x"
"Mouse","GB",
`);

  await t.test("given a column in a datatable, it should return 2 rows", async () => {
    const output = await adaptor(
      {
        "data": createDatatable(testCsvFilePath),
        "column name": "Country",
        "filter type": "equals",
        "filter value": "gb",
        "case sensitive": "true",
      },
    );
    assert.ok(output.data, "adaptor should return data");
    assert.ok(output.complementary, "adaptor should return complementary");
    compareFile(
      output.data.getSource(),
      `"id","Country","num"\n"Gorilla","gb","-2"\n"Human","gb","0x"\n`
    );
    compareFile(
      output.complementary.getSource(),
      `"id","Country","num"\n"Bovine","de","1"\n"Gibbon","fr","1"\n"Orangutan",,"0"\n"Mouse","GB",\n`
    );
  });

  await t.test("given a column in a datatable and case sensitive set to false, it should return 3 rows", async () => {
    const output = await adaptor(
      {
        "data": createDatatable(testCsvFilePath),
        "column name": "Country",
        "filter type": "equals",
        "filter value": "gb",
        "case sensitive": false,
      },
    );
    assert.ok(output.data, "adaptor should return data");
    assert.ok(output.complementary, "adaptor should return complementary");
    compareFile(
      output.data.getSource(),
      `"id","Country","num"\n"Gorilla","gb","-2"\n"Human","gb","0x"\n"Mouse","GB",\n`
    );
    compareFile(
      output.complementary.getSource(),
      `"id","Country","num"\n"Bovine","de","1"\n"Gibbon","fr","1"\n"Orangutan",,"0"\n`
    );
  });

  await t.test("given greater-than 1 filter, it should return 2 rows", async () => {
    const output = await adaptor(
      {
        "data": createDatatable(testCsvFilePath),
        "column name": "num",
        "filter type": "greater-than",
        "filter value": "0",
      },
    );
    assert.ok(output.data, "adaptor should return data");
    assert.ok(output.complementary, "adaptor should return complementary");
    compareFile(
      output.data.getSource(),
      `"id","Country","num"\n"Bovine","de","1"\n"Gibbon","fr","1"\n`
    );
    compareFile(
      output.complementary.getSource(),
      `"id","Country","num"\n"Orangutan",,"0"\n"Gorilla","gb","-2"\n"Human","gb","0x"\n"Mouse","GB",\n`
    );
  });

  await t.test("given greater-than-or-equal 1 filter, it should return 3 rows", async () => {
    const output = await adaptor(
      {
        "data": createDatatable(testCsvFilePath),
        "column name": "num",
        "filter type": "greater-than-or-equal",
        "filter value": "0",
      },
    );
    assert.ok(output.data, "adaptor should return data");
    assert.ok(output.complementary, "adaptor should return complementary");
    compareFile(
      output.data.getSource(),
      `"id","Country","num"\n"Bovine","de","1"\n"Gibbon","fr","1"\n"Orangutan",,"0"\n`
    );
    compareFile(
      output.complementary.getSource(),
      `"id","Country","num"\n"Gorilla","gb","-2"\n"Human","gb","0x"\n"Mouse","GB",\n`
    );
  });

  await t.test("given a column with number/letter data, it should filter on numbers only", async () => {
    const output = await adaptor(
      {
        "data": createDatatable(testCsvFilePath),
        "column name": "num",
        "filter type": "is-number",
      },
    );
    assert.ok(output.data, "adaptor should return data");
    assert.ok(output.complementary, "adaptor should return complementary");
    compareFile(
      output.data.getSource(),
      `"id","Country","num"\n"Bovine","de","1"\n"Gibbon","fr","1"\n"Orangutan",,"0"\n"Gorilla","gb","-2"\n`
    );
    compareFile(
      output.complementary.getSource(),
      `"id","Country","num"\n"Human","gb","0x"\n"Mouse","GB",\n`
    );
  });
  await t.test("given a column with number/letter data, it should filter on data thats not a number", async () => {
    const output = await adaptor(
      {
        "data": createDatatable(testCsvFilePath),
        "column name": "num",
        "filter type": "not-number",
      },
    );
    assert.ok(output.data, "adaptor should return data");
    assert.ok(output.complementary, "adaptor should return complementary");
    compareFile(
      output.data.getSource(),
      `"id","Country","num"\n"Human","gb","0x"\n"Mouse","GB",\n`
    );
    compareFile(
      output.complementary.getSource(),
      `"id","Country","num"\n"Bovine","de","1"\n"Gibbon","fr","1"\n"Orangutan",,"0"\n"Gorilla","gb","-2"\n`
    );
  });

});
