const test = require("node:test");
const assert = require("node:assert");

const runAdaptor = require("../../../runner/run-adaptor.js");

const adaptor = require("../index.js");

test("find-value-in-dictionary adaptor", async (t) => {

  const dictionary = new Map([
    [ "A", "65" ],
    [ "B", "66" ],
    [ "C", "67" ],
    [ "Perú", "1" ],
  ]);

  await t.test("given an existing key, it should find a value in a dictionary", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "dictionary": dictionary,
        "key": "A",
      }
    );
    assert.ok(output.value);
    assert.equal(
      output.value,
      "65",
    );
  });

  await t.test("given a non-existing key, it should not find a value in a dictionary", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "dictionary": dictionary,
        "key": "D",
      }
    );
    assert.equal(output.value, "");
  });

  await t.test("given a non-existing key and a default value, it should return the default value", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "dictionary": dictionary,
        "key": "D",
        "default value": 0,
      }
    );
    assert.equal(output.value, 0);
  });

  await t.test("given case sensitive and match diacritics set to false, it should find a text value in a dictionary", async () => {
    const result = await runAdaptor(
      adaptor,
      {
        "dictionary": dictionary,
        "key": "perú",
      }
    );
    assert.equal(result.value, "1");
  });

  await t.test("given case sensitive set to true, it should not find a value in a list", async () => {
    const result = await runAdaptor(
      adaptor,
      {
        "dictionary": dictionary,
        "key": "perú",
        "case sensitive": true,
      }
    );
    assert.equal(result.value, "");
  });

  await t.test("given match diacritics set to true, it should not find a value in a list", async () => {
    const result = await runAdaptor(
      adaptor,
      {
        "dictionary": dictionary,
        "key": "Peru",
        "match diacritics": true,
      }
    );
    assert.equal(result.value, "");
  });

});
