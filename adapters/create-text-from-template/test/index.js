const test = require("node:test");
const assert = require("node:assert");

const runAdaptor = require("../../../runner/run-adaptor.js");
const adaptor = require("../index.js");

test("create-text-from-template adaptor", async (t) => {

  await t.test("given a template, it should return rendered text", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "template": "Hello {{ var }}!",
        "variables": [
          [ "var", "World" ],
        ],
      },
    );
    assert.ok(output.text, "adaptor should return text");
    assert.deepEqual(
      output.text,
      "Hello World!",
    );
  });

});
