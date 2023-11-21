const test = require("node:test");
const assert = require("node:assert");

const runAdaptor = require("../../../runner/run-adaptor.js");

const adaptor = require("../index.js");

test("prepend-to-list adaptor", async (t) => {

  await t.test("given a list, it should add a value to the beginning of the list", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        list: [ "1", "2" ],
        value: "3",
      },
    );
    const actual = output.list;
    const expected = [ "3", "1", "2" ];
    assert.deepEqual(actual, expected);
  });

});
