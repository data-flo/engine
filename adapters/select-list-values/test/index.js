const test = require("node:test");
const assert = require("node:assert");

const runAdaptor = require("../../../runner/run-adaptor.js");

const adaptor = require("../index.js");

test("select-list-values adaptor", async (t) => {

  await t.test("given a list and positive begin and end row numbers, it should return a list with 2 values", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        //         1    2    3    4    4    6
        "list": [ "a", "b", "c", "d", "e", "f" ],
        "begin": 2,
        "end": 3,
      },
    );
    assert.ok(output.list, "adaptor should return list");
    assert.deepEqual(output.list, ["b", "c"]);
  });

  await t.test("given a list and positive begin row number, it should return a list with 4 values", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        //         1    2    3    4    4    6
        "list": [ "a", "b", "c", "d", "e", "f" ],
        "begin": 3,
      },
    );
    assert.ok(output.list, "adaptor should return list");
    assert.deepEqual(output.list, ["c", "d", "e", "f"]);
  });

  await t.test("given a list and positive begin row number and a limit, it should return a list with 2 values", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        //         1    2    3    4    4    6
        "list": [ "a", "b", "c", "d", "e", "f" ],
        "begin": 3,
        "limit": 2,
      },
    );
    assert.ok(output.list, "adaptor should return list");
    assert.deepEqual(output.list, ["c", "d"]);
  });

  await t.test("given a list and positive begin row number and a large limit, it should return a list with 4 values", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        //         1    2    3    4    4    6
        "list": [ "a", "b", "c", "d", "e", "f" ],
        "begin": 3,
        "limit": 1000,
      },
    );
    assert.ok(output.list, "adaptor should return list");
    assert.deepEqual(output.list, ["c", "d", "e", "f"]);
  });

  await t.test("given a list and negative begin row number, it should return a list with 3 values", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        //         1    2    3    4    4    6
        "list": [ "a", "b", "c", "d", "e", "f" ],
        "begin": -4,
      },
    );
    assert.ok(output.list, "adaptor should return list");
    assert.deepEqual(output.list, ["c", "d", "e", "f"]);
  });

  await t.test("given a list and negative begin and end row numbers, it should return a list with 3 values", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        //         1    2    3    4    4    6
        "list": [ "a", "b", "c", "d", "e", "f" ],
        "begin": -4,
        "end": -2,
      },
    );
    assert.ok(output.list, "adaptor should return list");
    assert.deepEqual(output.list, ["c", "d", "e"]);
  });

});
