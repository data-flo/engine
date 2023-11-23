const assert = require("node:assert");
const test = require("node:test");

const runAdaptor = require("../../../runner/run-adaptor.js");

const adaptor = require("../index.js");

test("convert-date-to-text adaptor", async (t) => {

  await t.test("given two text without separator, it should return the concatenated text", async () => {
    const output = await runAdaptor(
      adaptor,
      {
      },
    );
    assert.ok(output.text, "adaptor should return text");
    const actual = output.text;
    const expected = new Date().toISOString();
    assert.equal(actual.substr(0, 19), expected.substr(0, 19));
  });

});
