const assert = require("node:assert");
const test = require("node:test");

const runAdaptor = require("../../../runner/run-adaptor.js");

const adaptor = require("../index.js");

test("filter-list adaptor", async (t) => {

  await t.test("given a list and a text pattern, it should filter it", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "list": [ "red", "green", "blue" ],
        "filter type": "equals",
        "filter value": "blue",
      },
    );
    assert.ok(output.values, "adaptor should return values");
    assert.ok(output.complementary, "adaptor should return complementary");
    assert.deepEqual(
      output.values,
      ["blue"],
    );
    assert.deepEqual(
      output.complementary,
      [ "red", "green" ],
    );
  });

  await t.test("given a list and a regex pattern, it should filter it", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "list": [ "red", "green", "blue", "yellow" ],
        "filter type": "regex",
        "filter value": "re?",
        "case sensitive": "false",
      },
    );
    assert.ok(output.values, "adaptor should return values");
    assert.ok(output.complementary, "adaptor should return complementary");
    assert.deepEqual(
      output.values,
      [ "red", "green" ],
    );
    assert.deepEqual(
      output.complementary,
      [ "blue", "yellow"],
    );
  });

  await t.test("given case sensitive and match diacritics set to default, it should return 4 elements", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "list": [ "Perú", "Peru", "perú", "peru" ],
        "filter type": "equals",
        "filter value": "peru",
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

  await t.test("given case sensitive and match diacritics set to false, it should return 4 elements", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "list": [ "Perú", "Peru", "perú", "peru" ],
        "filter type": "equals",
        "filter value": "peru",
        "case sensitive": false,
        "match diacritics": false,
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

  await t.test("given match diacritics set to true, it should return 2 elements", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "list": [ "Perú", "Peru", "perú", "peru" ],
        "filter type": "equals",
        "filter value": "peru",
        "case sensitive": false,
        "match diacritics": true,
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

  await t.test("given case sensitive set to true, it should return 2 elements", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "list": [ "Perú", "Peru", "perú", "peru" ],
        "filter type": "equals",
        "filter value": "peru",
        "case sensitive": true,
        "match diacritics": false,
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

  await t.test("given case sensitive and match diacritics set to true, it should return 1 element", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "list": [ "Perú", "Peru", "perú", "peru" ],
        "filter type": "equals",
        "filter value": "peru",
        "case sensitive": true,
        "match diacritics": true,
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
