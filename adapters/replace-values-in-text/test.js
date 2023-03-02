const tap = require("../../utils/testing/unit");
const runAdaptor = require("../../runner/run-adaptor");

const adaptor = require("./index");

tap.test("replace-values-in-text adaptor", async () => {

  tap.test("given a text without replacement, it should replace with blank", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "text": "Centre for Genomic Pathogen Surveillance",
        "pattern": "en",
      },
    );
    tap.ok(output.text, "adaptor should return text");
    tap.same(
      output.text,
      "Ctre for Gomic Pathog Surveillance"
    );
  });

  tap.test("given a text with replacement, it should replace with *", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "text": "Centre for Genomic Pathogen Surveillance",
        "pattern": "en",
        "replacement": "*",
      },
    );
    tap.ok(output.text, "adaptor should return text");
    tap.same(
      output.text,
      "C*tre for G*omic Pathog* Surveillance"
    );
  });

  tap.test("given a text with replacement, it should replace with *", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "text": "Centre for Genomic Pathogen Surveillance",
        "pattern": "/e[n|i]?/",
        "replacement": "*",
      },
    );
    tap.ok(output.text, "adaptor should return text");
    tap.same(
      output.text,
      "C*tr* for G*omic Pathog* Surv*llanc*"
    );
  });

});
