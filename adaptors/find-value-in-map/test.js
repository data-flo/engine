import tap  from "../../utils/testing/unit";
import runAdaptor  from "../../runner/run-adaptor";
import adaptor  from "./index";




tap.test("find-value-in-map adaptor", async () => {

  const map = new Map([
    [ "A", "65" ],
    [ "B", "66" ],
    [ "C", "67" ],
  ]);

  tap.test("should find a text value in a map", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        map,
        "key": "A",
      }
    );
    tap.ok(output.value);
    tap.same(
      output.value,
      "65",
    );
  });

});
