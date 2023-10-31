const tap = require("../../utils/testing/unit");

const runAdaptor = require("../../runner/run-adaptor");
const adaptor = require("./index");

tap.test("create-list-from-datatable adaptor", async () => {

  tap.test("given a text, it should return a list", async (t) => {
    const output = await runAdaptor(
      adaptor,
      {
        "text": "a\r\nb\nc\n",
      },
    );
    t.ok(output.list, "adaptor should return list");
    const actual = output.list;
    const expected = [ "a", "b", "c" ];
    t.same(actual, expected);
  });

  tap.test("given a text, it should return a list", async (t) => {
    const output = await runAdaptor(
      adaptor,
      {
        "text": "a b c d",
        "separator": "\\u0020",
      },
    );
    t.ok(output.list, "adaptor should return list");
    const actual = output.list;
    const expected = [ "a", "b", "c", "d" ];
    t.same(actual, expected);
  });

  tap.test("given a text, it should return a list", async (t) => {
    const output = await runAdaptor(
      adaptor,
      {
        "text": "a\u0009b\u0009c\u0009d",
        "separator": "\\u0009",
      },
    );
    t.ok(output.list, "adaptor should return list");
    const actual = output.list;
    const expected = [ "a", "b", "c", "d" ];
    t.same(actual, expected);
  });

  tap.test("given a text and a limit, it should return a list", async (t) => {
    const output = await runAdaptor(
      adaptor,
      {
        "text": "a\r\nb\nc\n",
        "limit": 2,
      },
    );
    t.ok(output.list, "adaptor should return list");
    const actual = output.list;
    const expected = [ "a", "b" ];
    t.same(actual, expected);
  });

});
