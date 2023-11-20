const tap = require("../../utils/testing/unit");

const runAdaptor = require("../../runner/run-adaptor");

const adaptor = require("./index");

await t.test("remove-duplicate-list-values adaptor", async () => {

  await t.test("given a list, it should return a set", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "list": [ "A", "100", "2", "1", "a", "1", "200" ],
      },
    );
    assert.ok(output.list, "adaptor should return list");
    assert.deepEqual(
      output.list,
      [ "A", "100", "2", "1", "200" ],
    );
  });

  await t.test("given a list, it should return a set", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "list": [ "A", "100", "2", "1", "a", "1", "200" ],
        "case sensitive": true,
      },
    );
    assert.ok(output.list, "adaptor should return list");
    assert.deepEqual(
      output.list,
      [ "A", "100", "2", "1", "a", "200" ],
    );
  });

});
