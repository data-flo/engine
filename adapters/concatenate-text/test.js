const tap = require("../../utils/testing/unit");

const adaptor = require("./index");

await t.test("concatenate-text adaptor", async () => {

  await t.test("given two text without separator, it should return the concatenated text", async (t) => {
    const output = await adaptor({
      "text one": "Hello",
      "text two": "World",
      "separator": "",
    });
    t.ok(output.combination, "adaptor should return combination");
    const actual = output.combination;
    const expected = "HelloWorld";
    t.equal(actual, expected);
  });

  await t.test("given two text with separator, it should return the concatenated text", async (t) => {
    const output = await adaptor({
      "text one": "Hello",
      "text two": "World",
      "separator": " ",
    });
    t.ok(output.combination, "adaptor should return combination");
    const actual = output.combination;
    const expected = "Hello World";
    t.equal(actual, expected);
  });

});
