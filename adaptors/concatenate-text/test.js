const tap = require("tap");

const adaptor = require("./index");

tap.test("concatenate-text adaptor", async () => {

  tap.test("given two text without separator, it should return the concatenated text", async (t) => {
    const output = await adaptor({
      "left": "Hello",
      "right": "World",
      "separator": "",
    });
    t.ok(output.combination, "adaptor should return combination");
    const actual = output.combination;
    const expected = "HelloWorld";
    t.equal(actual, expected);
  });

  tap.test("given two text with separator, it should return the concatenated text", async (t) => {
    const output = await adaptor({
      "left": "Hello",
      "right": "World",
      "separator": " ",
    });
    t.ok(output.combination, "adaptor should return combination");
    const actual = output.combination;
    const expected = "Hello World";
    t.equal(actual, expected);
  });

});
