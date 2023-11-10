const test = require("node:test");
const assert = require("node:assert");

const runAdaptor = require("../../runner/run-adaptor.js");
const adaptor = require("./index.js");

test("find-value-in-list adaptor", async (t) => {

  await t.test("should find a text value in a list", async () => {
    const result = await runAdaptor(
      adaptor,
      {
        "list": ["red", "green", "blue"],
        "pattern": "green",
      }
    );
    assert.equal(result.value, "green");
    assert.equal(result.index, 2);
  });

  await t.test("should find a value in a list by using a regex", async () => {
    const result = await runAdaptor(
      adaptor,
      {
        "list": ["red", "green", "blue"],
        "pattern": "/.*ue$/",
      }
    );
    assert.equal(result.value, "blue");
    assert.equal(result.index, 3);
  });

  await t.test("given match case and match diacritics set to false, it should find a text value in a list", async () => {
    const result = await runAdaptor(
      adaptor,
      {
        "list": ["Perú", "green", "blue"],
        "pattern": "perú",
      }
    );
    assert.equal(result.value, "Perú");
    assert.equal(result.index, 1);
  });

  await t.test("given match case set to true, it should not find a value in a list", async () => {
    const result = await runAdaptor(
      adaptor,
      {
        "list": ["Perú", "green", "blue"],
        "pattern": "perú",
        "match case": true,
      }
    );
    assert.equal(result.value, null);
    assert.equal(result.index, null);
  });

  await t.test("given match diacritics set to true, it should not find a value in a list", async () => {
    const result = await runAdaptor(
      adaptor,
      {
        "list": ["Perú", "green", "blue"],
        "pattern": "Peru",
        "match diacritics": true,
      }
    );
    assert.equal(result.value, null);
    assert.equal(result.index, null);
  });

  await t.test("should not find a non-existing value in a list", async () => {
    const result = await runAdaptor(
      adaptor,
      {
        "list": ["red", "green", "blue"],
        "pattern": "yellow",
      }
    );
    assert.equal(result.value, null);
    assert.equal(result.index, null);
  });

});
