import tap  from "../../utils/testing/unit";
import adaptor  from "./index";
import runAdaptor  from "../../runner/run-adaptor";




tap.test("convert-date-to-text adaptor", async () => {

  tap.test("given two text without separator, it should return the concatenated text", async (t) => {
    const output = await runAdaptor(
      adaptor,
      {
      },
    );
    t.ok(output.text, "adaptor should return text");
    const actual = output.text;
    const expected = new Date().toISOString();
    t.equal(actual.substr(0, 19), expected.substr(0, 19));
  });

});
