const assert = require("node:assert");
const test = require("node:test");

const runAdaptor = require("../../runner/run-adaptor.js");

const adaptor = require("./index.js");

test("filter-list adaptor", async (t) => {

  await t.test("given a list and a text pattern, it should filter it", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "list": [ "red", "green", "blue" ],
        "pattern": "green",
        "filter type": "equals",
        "filter value": "blue",
      },
    );
    assert.ok(output.values, "adaptor should return values");
    assert.ok(output.complementary, "adaptor should return complementary");
    assert.deepEqual(
      output.values,
      [ "green", "blue"],
    );
    assert.deepEqual(
      output.complementary,
      [ "red" ],
    );
  });

  await t.test("given a list and a regex pattern, it should filter it", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "list": [ "red", "green", "blue", "yellow" ],
        "pattern": "/ree?/",
        "filter type": "equals",
        "filter value": "blue",
      },
    );
    assert.ok(output.values, "adaptor should return values");
    assert.ok(output.complementary, "adaptor should return complementary");
    assert.deepEqual(
      output.values,
      [ "red", "green", "blue" ],
    );
    assert.deepEqual(
      output.complementary,
      [ "yellow" ],
    );
  });

  await t.test("given match case and match diacritics set to true, it should return 4 elements", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "list": [ "Perú", "Peru", "perú", "peru" ],
        "pattern": "peru",
        "filter type": "not-number",
        "match case": true,
        "match diacritics": true,
      },
    );
    assert.ok(output.values, "adaptor should return values");
    assert.ok(output.complementary, "adaptor should return complementary");
    assert.deepEqual(
      output.values,
      [ "Perú", "Peru", "perú", "peru" ],
    );
    assert.deepEqual(
      output.complementary,
      [],
    );
  });

  await t.test("given match case set to true, it should return 2 elements", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "list": [ "Perú", "Peru", "perú", "peru" ],
        "pattern": "peru",
        "filter type": "excludes",
        "filter value": "",
        "match case": true,
        "match diacritics": false,
      },
    );
    assert.ok(output.values, "adaptor should return values");
    assert.ok(output.complementary, "adaptor should return complementary");
    assert.deepEqual(
      output.values,
      [ "Peru", "peru" ],
    );
    assert.deepEqual(
      output.complementary,
      [ "Perú", "perú" ],
    );
  });

  await t.test("given match diacritics set to true, it should return 2 elements", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "list": [ "Perú", "Peru", "perú", "peru" ],
        "pattern": "peru",
        "match case": false,
        "match diacritics": true,
        "filter type": "excludes",
        "filter value": "",
      },
    );
    assert.ok(output.values, "adaptor should return values");
    assert.ok(output.complementary, "adaptor should return complementary");
    assert.deepEqual(
      output.values,
      [ "perú", "peru" ],
    );
    assert.deepEqual(
      output.complementary,
      [ "Perú", "Peru" ],
    );
  });

  await t.test("given match case and match diacritics set to false, it should return 1 element", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "list": [ "Perú", "Peru", "perú", "peru" ],
        "pattern": "peru",
        "filter type": "excludes",
        "filter value": "",
        "match case": false,
        "match diacritics": false,
      },
    );
    assert.ok(output.values, "adaptor should return values");
    assert.ok(output.complementary, "adaptor should return complementary");
    assert.deepEqual(
      output.values,
      [ "peru" ],
    );
    assert.deepEqual(
      output.complementary,
      [ "Perú", "Peru", "perú" ],
    );
  });

});
