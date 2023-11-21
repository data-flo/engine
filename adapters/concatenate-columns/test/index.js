const test = require("node:test");
const assert = require("node:assert");

const { compareFile } = require("../../../utils/testing/unit.js");
const createTmpTextFile = require("../../../utils/file/tmp-text.js");
const createDatatable = require("../../../types/datatable.js");
const runAdaptor = require("../../../runner/run-adaptor.js");

const adaptor = require("../index.js");

test("calculate-time-difference adaptor", async (t) => {
  const testCsvFilePath = await createTmpTextFile(`"one","two","three"
"aaa","aaa",
"AAA","aaa",
"a","b","c"
`);

  await t.test("given two columns, it should return concatenated text", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "data": createDatatable(testCsvFilePath),
        "columns": ["one", "two"],
        "separator": "",
        "concatenated column": "concatenated",
      });
    assert.ok(output.data, "adaptor should return data");
    compareFile(
      output.data.getSource(),
      `"one","two","three","concatenated"
"aaa","aaa",,"aaaaaa"
"AAA","aaa",,"AAAaaa"
"a","b","c","ab"
`
    );
  });

  await t.test("given three columns, it should return concatenated text", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "data": createDatatable(testCsvFilePath),
        "columns": ["one", "two", "three"],
        "separator": "-",
        "concatenated column": "concatenated",
      });
    assert.ok(output.data, "adaptor should return data");
    compareFile(
      output.data.getSource(),
      `"one","two","three","concatenated"
"aaa","aaa",,"aaa-aaa-"
"AAA","aaa",,"AAA-aaa-"
"a","b","c","a-b-c"
`
    );
  });

  await t.test("given one column only, it should throw an error", async () => {
    await assert.rejects(
      runAdaptor(
        adaptor,
        {
          "data": createDatatable(testCsvFilePath),
          "columns": ["A"],
          "concatenated column": "C",
        }),
      new Error("At least two columns are required"),
    );
  });

  await t.test("given non-existing columns, it should throw an error", async () => {
    await assert.rejects(
      runAdaptor(
        adaptor,
        {
          "data": createDatatable(testCsvFilePath),
          "columns": ["A", "B"],
          "concatenated column": "C",
        }
      ),
      new Error("Datatable does not include a column named A"),
    );
  });

  await t.test("given an existing column, it should throw an error", async () => {
    await assert.rejects(
      runAdaptor(
        adaptor,
        {
          "data": createDatatable(testCsvFilePath),
          "columns": ["one", "two"],
          "concatenated column": "three",
        }
      ),
      new Error("Datatable already includes a column named three"),
    );
  });

});
