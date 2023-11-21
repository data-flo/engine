const test = require("node:test");
const assert = require("node:assert");

const runAdaptor = require("../../../runner/run-adaptor.js");

const adaptor = require("../index.js");

test("append-lists adaptor", async (t) => {

  await t.test("given two lists, it should return a merged list", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "first list": [ "1", "2" ],
        "second list": [ "3", "4" ],
      },
    );
    assert.ok(output.list, "adaptor should return list");
    assert.deepEqual(
      output.list,
      [ "1", "2", "3", "4" ],
    );
  });

});
