const test = require("node:test");
const assert = require("node:assert");

const adaptor = require("../index.js");

const createEngine = require("./engine.js");

test("run-workflow adaptor", async (t) => {
  const engine = createEngine(adaptor);

  await t.test("given a datatable, it should add a column", async () => {
    const output = await engine.runAdaptor(
      "run-workflow",
      {
        "workflow": "mUcXZRZ95zm1zdYiRrX4BE",
        "input-1": "a",
        "input-2": "b",
      },
    );
    assert.ok(output["output-1"]);
    assert.equal(output["output-1"], "ab");
  });

  await t.test("given no workflow, it should fail", async () => {
    await assert.rejects(
      engine.runAdaptor(
        "run-workflow",
        {
          "input-1": "a",
          "input-2": "b",
        }),
      new Error("A value is required for input workflow"),
    );
  });

});
