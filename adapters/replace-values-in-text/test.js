const tap = require("../../utils/testing/unit");
const runAdaptor = require("../../runner/run-adaptor");

const adaptor = require("./index");

await t.test("replace-values-in-text adaptor", async () => {

  await t.test("given a text without replacement, it should replace with blank", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "text": "Centre for Genomic Pathogen Surveillance",
        "pattern": "en",
      },
    );
    assert.ok(output.text, "adaptor should return text");
    assert.deepEqual(
      output.text,
      "Ctre for Gomic Pathog Surveillance"
    );
  });

  await t.test("given a text with replacement, it should replace with *", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "text": "Centre for Genomic Pathogen Surveillance",
        "pattern": "en",
        "replacement": "*",
      },
    );
    assert.ok(output.text, "adaptor should return text");
    assert.deepEqual(
      output.text,
      "C*tre for G*omic Pathog* Surveillance"
    );
  });

  await t.test("given a text with replacement, it should replace with *", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "text": "Centre for Genomic Pathogen Surveillance",
        "pattern": "/e[n|i]?/",
        "replacement": "*",
      },
    );
    assert.ok(output.text, "adaptor should return text");
    assert.deepEqual(
      output.text,
      "C*tr* for G*omic Pathog* Surv*llanc*"
    );
  });

});
