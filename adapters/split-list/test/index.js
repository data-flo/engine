const test = require("node:test");
const assert = require("node:assert");

const runAdaptor = require("../../../runner/run-adaptor.js");
const adaptor = require("../index.js");

test("split-list adaptor", async (t) => {

  await t.test("given a list and a separator, it should return two lists", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "list": [ "100", "2", "1", "10", "200" ],
        "separator": "1",
      },
    );
    assert.ok(output.first, "adaptor should return first");
    assert.ok(output.second, "adaptor should return second");
    assert.deepEqual(
      output.first,
      [ "100", "2" ],
      [ "10", "200" ],
    );
  });

  await t.test("given a list and append set to true, it should return add the separator to the first list", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "list": [ "100", "2", "1", "10", "200" ],
        "separator": "1",
        "append": true,
      },
    );
    assert.ok(output.first, "adaptor should return first");
    assert.ok(output.second, "adaptor should return second");
    assert.deepEqual(
      output.first,
      [ "100", "2", "1" ],
      [ "10", "200" ],
    );
  });
  await t.test("given a list and prepend set to true, it should return add the separator to the second list", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "list": [ "100", "2", "1", "10", "200" ],
        "separator": "1",
        "prepend": true,
      },
    );
    assert.ok(output.first, "adaptor should return first");
    assert.ok(output.second, "adaptor should return second");
    assert.deepEqual(
      output.first,
      [ "100", "2" ],
      [ "10", "200", "1" ],
    );
  });

});
