const test = require("node:test");
const assert = require("node:assert");

const runAdaptor = require("../../../runner/run-adaptor.js");
const createDictionary = require("../../../types/dictionary.js");
const adaptor = require("../index.js");

test("[add-value-to-dictionary] adaptor", async (t) => {

  await t.test("given just key/value, it should add them to a new dictionary", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "key": "A",
        "value": "65",
      },
    );
    assert.ok(output.dictionary);
    assert.deepEqual(
      Array.from(output.dictionary.entries()),
      [
        [ "A", "65" ],
      ],
    );
  });

  await t.test("given a dictionary, it should add a key/value to it", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "dictionary": createDictionary({ "A": "65" }),
        "key": "B",
        "value": "66",
      },
    );
    assert.ok(output.dictionary);
    assert.deepEqual(
      Array.from(output.dictionary.entries()),
      [
        [ "A", "65" ],
        [ "B", "66" ],
      ],
    );
  });

  await t.test("given an existing key, it should overwrite it", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "dictionary": createDictionary({ "A": "0" }),
        "key": "A",
        "value": "65",
      },
    );
    assert.ok(output.dictionary);
    assert.deepEqual(
      Array.from(output.dictionary.entries()),
      [
        [ "A", "65" ],
      ],
    );
  });

  await t.test("given an existing key and overwrite set to false, it should return the input dictionary as is", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "dictionary": createDictionary({ "A": "0" }),
        "key": "A",
        "value": "65",
        "overwrite": false,
      },
    );
    assert.ok(output.dictionary);
    assert.deepEqual(
      Array.from(output.dictionary.entries()),
      [
        [ "A", "0" ],
      ],
    );
  });

});
