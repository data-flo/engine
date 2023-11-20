const test = require("node:test");
const assert = require("node:assert");

const { compareFile } = require("../../../utils/testing/unit.js");

const createTmpTextFile = require("../../../utils/file/tmp-text.js");
const createDatatable = require("../../../types/datatable.js");

const adaptor = require("../index.js");

const createEngine = require("./engine.js");

test("workflow-repeater adaptor", async (t) => {
  const testCsvFilePath = await createTmpTextFile(`"a","b"
"1","1"
"2","2"
"3","3"
`);

  const engine = createEngine(adaptor);

  await t.test("given a datatable, it should add a column", async () => {
    const output = await engine.runAdaptor(
      "workflow-repeater",
      {
        "workflow": "mUcXZRZ95zm1zdYiRrX4BE",
        "data": createDatatable(testCsvFilePath),
        "input-1 column": "a",
        "input-2 column": "b",
        "output-1 column": "c",
      },
    );
    assert.ok(output.data);
    compareFile(
      output.data.getSource(),
      `"a","b","c"
"1","1","11"
"2","2","22"
"3","3","33"
`
    );
  });

  await t.test("given no workflow, it should fail", async () => {
    await assert.rejects(
      engine.runAdaptor(
        "workflow-repeater",
        {
          "data": createDatatable(testCsvFilePath),
          "input-1 column": "a",
          "input-2 column": "b",
          "output-2 column": "c",
        }),
      new Error("A value is required for input workflow"),
    );
  });

});
