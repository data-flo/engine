import tap  from "../../utils/testing/unit";
import runAdaptor  from "../../runner/run-adaptor";
import adaptor  from "./index";





tap.test("remove-duplicate-list-values adaptor", async () => {

  tap.test("given a list, it should return a set", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "list": [ "A", "100", "2", "1", "a", "1", "200" ],
      },
    );
    tap.ok(output.list, "adaptor should return list");
    tap.same(
      output.list,
      [ "A", "100", "2", "1", "200" ],
    );
  });

  tap.test("given a list, it should return a set", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "list": [ "A", "100", "2", "1", "a", "1", "200" ],
        "case sensitive": true,
      },
    );
    tap.ok(output.list, "adaptor should return list");
    tap.same(
      output.list,
      [ "A", "100", "2", "1", "a", "200" ],
    );
  });

});
