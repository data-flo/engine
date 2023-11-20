/* eslint-disable quotes */
const tap = require("../../utils/testing/unit");

const runAdaptor = require("../../runner/run-adaptor");
const adaptor = require("./index");

await t.test("append-lists adaptor", async () => {

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
