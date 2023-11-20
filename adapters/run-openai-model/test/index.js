const test = require("node:test");
const assert = require("node:assert");

const runAdaptor = require("../../../runner/run-adaptor.js");

const adaptor = require("../index.js");

test("run-openai-model adaptor", async (t) => {
  assert.ok(process.env.OPENAI_API_KEY, "OPENAI_API_KEY is missing from env");

  await t.test("given a datatable, it should add a column", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "system message": "You will be provided with a number, and your job is to return positive if the number is greater than zero, or negative if the number is less than zero.",
        "user message": "1",
        "api token": process.env.OPENAI_API_KEY,
      },
    );
    assert.ok(output["assistant message"]);
    assert.equal(output["assistant message"], "positive");
  });

});
