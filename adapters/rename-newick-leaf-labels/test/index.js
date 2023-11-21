const test = require("node:test");
const assert = require("node:assert");

const runAdaptor = require("../../../runner/run-adaptor.js");

const adaptor = require("../index.js");

test("reshape-wide-to-long adaptor", async (t) => {

  await t.test("given a Newick string, it should rename 7 leaf labels", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "newick": "(Bovine:0.69395,(Gibbon:0.0,(Orangutan:0.0,(Gorilla:0.0,(Chimp:0.0,Human:0.0)123:0.0)test:0.06124):0.0):0.54939,Mouse:1.21460);",
        "mapping": (
          new Map([
            [ "Bovine", "a" ],
            [ "Orangutan", "b" ],
            [ "Mouse", "Mouse" ],
          ])
        ),
      },
    );
    assert.ok(output.newick, "adaptor should return newick");
    assert.deepEqual(
      output.newick,
      "(a:0.69395,(Gibbon:0.0,(b:0.0,(Gorilla:0.0,(Chimp:0.0,Human:0.0)123:0.0)test:0.06124):0.0):0.54939,Mouse:1.21460);",
    );
  });

});
