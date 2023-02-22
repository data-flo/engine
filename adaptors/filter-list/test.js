import tap  from "../../utils/testing/unit";
import runAdaptor  from "../../runner/run-adaptor";
import adaptor  from "./index";





tap.test("filter-list adaptor", async () => {

  tap.test("given a list and a text pattern, it should filter it", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        list: [ "red", "green", "blue" ],
        pattern: "green",
      },
    );
    tap.ok(output.values, "adaptor should return values");
    tap.ok(output.complementary, "adaptor should return complementary");
    tap.same(
      output.values,
      [ "green" ],
    );
    tap.same(
      output.complementary,
      [ "red", "blue" ],
    );
  });

  tap.test("given a list and a regex pattern, it should filter it", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        list: [ "red", "green", "blue" ],
        pattern: "/ree?/",
      },
    );
    tap.ok(output.values, "adaptor should return values");
    tap.ok(output.complementary, "adaptor should return complementary");
    tap.same(
      output.values,
      [ "red", "green" ],
    );
    tap.same(
      output.complementary,
      [ "blue" ],
    );
  });

});
