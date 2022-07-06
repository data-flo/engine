const tap = require("tap");

const adaptor = require("./index");

tap.test("prepend-to-list adaptor", async () => {
  tap.test("given a list, it should add a value to the beginning of the list", async (t) => {
    const output = await adaptor({
      list: [ "1", "2" ],
      value: "3",
    });
    const actual = output.list;
    const expected = [ "3", "1", "2" ];
    t.same(actual, expected);
  });
});
