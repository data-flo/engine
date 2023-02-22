import tap  from "../../utils/testing/unit";
import runAdaptor  from "../../runner/run-adaptor";
import adaptor  from "./index";




tap.test("replace-values-in-list adaptor", async () => {

  tap.test("given a text without replacement, it should replace with blank", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "list": [ "Centre", "for", "Genomic", "Pathogen", "Surveillance" ],
        "pattern": "en",
      },
    );
    tap.ok(output.list, "adaptor should return list");
    tap.same(
      output.list,
      [ "Ctre", "for", "Gomic", "Pathog", "Surveillance" ],
    );
  });

  tap.test("given a text with replacement, it should replace with *", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "list": [ "Centre", "for", "Genomic", "Pathogen", "Surveillance" ],
        "pattern": "en",
        "replacement": "*",
      },
    );
    tap.ok(output.list, "adaptor should return list");
    tap.same(
      output.list,
      [ "C*tre", "for", "G*omic", "Pathog*", "Surveillance" ],
    );
  });

  tap.test("given a text with replacement, it should replace with *", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "list": [ "Centre", "for", "Genomic", "Pathogen", "Surveillance" ],
        "pattern": "/e[n|i|$]?/",
        "replacement": "*",
      },
    );
    tap.ok(output.list, "adaptor should return list");
    tap.same(
      output.list,
      [ "C*tr*", "for", "G*omic", "Pathog*", "Surv*llanc*" ],
    );
  });

  tap.test("given a text with replacement, it should replace with *", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "list": [ "one1", "1" ],
        "pattern": "1",
        "replacement": "*",
      },
    );
    tap.ok(output.list, "adaptor should return list");
    tap.same(
      output.list,
      [ "one*", "fo*r" ],
    );
  });

});
