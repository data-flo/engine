const test = require("node:test");
const assert = require("node:assert");

const runAdaptor = require("../../../runner/run-adaptor.js");
const adaptor = require("../index.js");

test("unique-list-values adaptor", async (t) => {

  await t.test("given a list with duplicates, it should return unique values", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "list": [ "100", "2", "100", "2", "1", "10", "2", "1", "200" ],
      },
    );
    assert.ok(output.list, "adaptor should return list");
    assert.deepEqual(
      output.list,
      [ "100", "2", "1", "10", "200" ],
    );
  });

});
