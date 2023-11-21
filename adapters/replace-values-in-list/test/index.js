const test = require("node:test");
const assert = require("node:assert");

const runAdaptor = require("../../../runner/run-adaptor.js");

const adaptor = require("../index.js");

test("replace-values-in-list adaptor", async (t) => {

  await t.test("given a text without replacement, it should replace with blank", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "list": [ "Centre", "for", "Genomic", "Pathogen", "Surveillance" ],
        "pattern": "en",
      },
    );
    assert.ok(output.list, "adaptor should return list");
    assert.deepEqual(
      output.list,
      [ "Ctre", "for", "Gomic", "Pathog", "Surveillance" ],
    );
  });

  await t.test("given a text with replacement, it should replace with *", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "list": [ "Centre", "for", "Genomic", "Pathogen", "Surveillance" ],
        "pattern": "en",
        "replacement": "*",
      },
    );
    assert.ok(output.list, "adaptor should return list");
    assert.deepEqual(
      output.list,
      [ "C*tre", "for", "G*omic", "Pathog*", "Surveillance" ],
    );
  });

  await t.test("given a text with replacement, it should replace with *", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "list": [ "Centre", "for", "Genomic", "Pathogen", "Surveillance" ],
        "pattern": "/e[n|i|$]?/",
        "replacement": "*",
      },
    );
    assert.ok(output.list, "adaptor should return list");
    assert.deepEqual(
      output.list,
      [ "C*tr*", "for", "G*omic", "Pathog*", "Surv*llanc*" ],
    );
  });

  await t.test("given a text with replacement, it should replace with *", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "list": [ "Centre", "for", "Genomic", "Pathogen", "Surveillance" ],
        "pattern": "ce",
        "replacement": "-",
      },
    );
    assert.ok(output.list, "adaptor should return list");
    assert.deepEqual(
      output.list,
      [ "-ntre", "for", "Genomic", "Pathogen", "Surveillan-" ],
    );
  });

});
