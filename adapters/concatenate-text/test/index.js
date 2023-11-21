const test = require("node:test");
const assert = require("node:assert");

const { compareFile } = require("../../../utils/testing/unit.js");
const createTmpTextFile = require("../../../utils/file/tmp-text.js");
const createDatatable = require("../../../types/datatable.js");
const runAdaptor = require("../../../runner/run-adaptor.js");

const adaptor = require("../index.js");

test("concatenate-text adaptor", async (t) => {

  await t.test("given two text without separator, it should return the concatenated text", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "text one": "Hello",
        "text two": "World",
        "separator": "",
      },
    );
    assert.ok(output.combination, "adaptor should return combination");
    const actual = output.combination;
    const expected = "HelloWorld";
    assert.equal(actual, expected);
  });

  await t.test("given two text with separator, it should return the concatenated text", async () => {
    const output = await runAdaptor(
      adaptor, {
        "text one": "Hello",
        "text two": "World",
        "separator": " ",
      },
    );
    assert.ok(output.combination, "adaptor should return combination");
    const actual = output.combination;
    const expected = "Hello World";
    assert.equal(actual, expected);
  });

});
