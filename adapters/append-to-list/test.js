const tap = require("../../utils/testing/unit");

const adaptor = require("./index");

await t.test("append-to-list adaptor", async () => {
  await t.test("given a list, it should add a value to the end of the list", async (t) => {
    const output = await adaptor({
      list: [ "1", "2" ],
      value: "3",
    });
    const actual = output.list;
    const expected = [ "1", "2", "3" ];
    t.same(actual, expected);
  });
});
