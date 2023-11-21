const test = require("node:test");
const assert = require("node:assert");

const runAdaptor = require("../../../runner/run-adaptor.js");

const adaptor = require("../index.js");

test("create-list-from-datatable adaptor", async (t) => {

  await t.test("given a text, it should return a list", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "text": "a\r\nb\nc\n",
      },
    );
    assert.ok(output.list, "adaptor should return list");
    const actual = output.list;
    const expected = [ "a", "b", "c" ];
    assert.deepEqual(actual, expected);
  });

  await t.test("given a text, it should return a list", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "text": "a b c d",
        "separator": "\\u0020",
      },
    );
    assert.ok(output.list, "adaptor should return list");
    const actual = output.list;
    const expected = [ "a", "b", "c", "d" ];
    assert.deepEqual(actual, expected);
  });

  await t.test("given a text, it should return a list", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "text": "a\u0009b\u0009c\u0009d",
        "separator": "\\u0009",
      },
    );
    assert.ok(output.list, "adaptor should return list");
    const actual = output.list;
    const expected = [ "a", "b", "c", "d" ];
    assert.deepEqual(actual, expected);
  });

  await t.test("given a text and a limit, it should return a list", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "text": "a\r\nb\nc\n",
        "limit": 2,
      },
    );
    assert.ok(output.list, "adaptor should return list");
    const actual = output.list;
    const expected = [ "a", "b" ];
    assert.deepEqual(actual, expected);
  });

});
