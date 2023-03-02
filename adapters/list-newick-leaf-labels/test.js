/* eslint-disable quotes */
const tap = require("../../utils/testing/unit");

const runAdaptor = require("../../runner/run-adaptor");
const adaptor = require("./index");

tap.test("reshape-wide-to-long adaptor", async () => {

  tap.test("given a Newick string, it should return 7 leaf labels", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "newick": "(Bovine:0.69395,(Gibbon:0.0,(Orangutan:0.0,(Gorilla:0.0,(Chimp:0.0,Human:0.0)123:0.0)test:0.06124):0.0):0.54939,Mouse:1.21460);",
      },
    );
    tap.ok(output.labels, "adaptor should return labels");
    tap.same(
      output.labels,
      [ "Bovine", "Mouse", "Gibbon", "Orangutan", "Gorilla", "Chimp", "Human" ],
    );
  });

});
