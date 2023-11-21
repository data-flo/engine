const test = require("node:test");
const assert = require("node:assert");

const { compareFile } = require("../../../utils/testing/unit.js");
const createTmpTextFile = require("../../../utils/file/tmp-text.js");
const createDatatable = require("../../../types/datatable.js");
const runAdaptor = require("../../../runner/run-adaptor.js");

const adaptor = require("../index.js");

test("format-time-column adaptor", async (t) => {
  const testCsvFilePath = await createTmpTextFile(`"a","b"
"1","3"
"2","4"
`);

  await t.test("given no operation, it should add values", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "data": createDatatable(testCsvFilePath),
        "left column": "a",
        "right column": "b",
        "result column": "c",
      },
    );
    assert.ok(output.data, "adaptor should return data");
    compareFile(
      output.data.getSource(),
      `"a","b","c"
"1","3","4"
"2","4","6"
`,
    );
  });

  await t.test("given operation set to add, it should add values", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "data": createDatatable(testCsvFilePath),
        "left column": "a",
        "right column": "b",
        "result column": "c",
        "operation": "add",
      },
    );
    assert.ok(output.data, "adaptor should return data");
    compareFile(
      output.data.getSource(),
      `"a","b","c"
"1","3","4"
"2","4","6"
`,
    );
  });

  await t.test("given operation set to subtract, it should subtract values", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "data": createDatatable(testCsvFilePath),
        "left column": "a",
        "right column": "b",
        "result column": "c",
        "operation": "subtract",
      },
    );
    assert.ok(output.data, "adaptor should return data");
    compareFile(
      output.data.getSource(),
      `"a","b","c"
"1","3","-2"
"2","4","-2"
`,
    );
  });

  await t.test("given operation set to multiply, it should multiply values", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "data": createDatatable(testCsvFilePath),
        "left column": "a",
        "right column": "b",
        "result column": "c",
        "operation": "multiply",
      },
    );
    assert.ok(output.data, "adaptor should return data");
    compareFile(
      output.data.getSource(),
      `"a","b","c"
"1","3","3"
"2","4","8"
`,
    );
  });

  await t.test("given operation set to divide, it should divide values", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "data": createDatatable(testCsvFilePath),
        "left column": "a",
        "right column": "b",
        "result column": "c",
        "operation": "divide",
      },
    );
    assert.ok(output.data, "adaptor should return data");
    compareFile(
      output.data.getSource(),
      `"a","b","c"
"1","3","0.3333333333333333"
"2","4","0.5"
`,
    );
  });

  await t.test("given operation set to percent, it should calculate percentage", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "data": createDatatable(testCsvFilePath),
        "left column": "a",
        "right column": "b",
        "result column": "c",
        "operation": "percent",
      },
    );
    assert.ok(output.data, "adaptor should return data");
    compareFile(
      output.data.getSource(),
      `"a","b","c"
"1","3","33.33333333333333"
"2","4","50"
`,
    );
  });


  await t.test("given operation set to exponent, it should calculate exponent", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "data": createDatatable(testCsvFilePath),
        "left column": "a",
        "right column": "b",
        "result column": "c",
        "operation": "exponent",
      },
    );
    assert.ok(output.data, "adaptor should return data");
    compareFile(
      output.data.getSource(),
      `"a","b","c"
"1","3","1"
"2","4","16"
`,
    );
  });

  await t.test("given operation set to percent and unit, it should calculate percentage", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "data": createDatatable(testCsvFilePath),
        "left column": "a",
        "right column": "b",
        "result column": "c",
        "result unit": " %",
        "operation": "percent",
      },
    );
    assert.ok(output.data, "adaptor should return data");
    compareFile(
      output.data.getSource(),
      `"a","b","c"
"1","3","33.33333333333333 %"
"2","4","50 %"
`,
    );
  });

});
