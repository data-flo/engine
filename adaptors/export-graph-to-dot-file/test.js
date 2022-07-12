const tap = require("tap");

const runAdaptor = require("../../runner/run-adaptor");

const adaptor = require("./index");

tap.test("export-graph-to-dot-file adaptor", async () => {

  tap.test("given a DOT string columns, it should return a graph", async (t) => {
    const output = await runAdaptor(
      adaptor,
      {
        graph: {
          nodes: [
            { id: "A", attributes: { label: "A" } },
            { id: "B" },
            { id: "C" },
            { id: "D" },
          ],
          edges: [
            { id: "edge-0", from: "A", to: "B", direction: "none", attributes: { label: "A to B" } },
            { id: "edge-1", from: "A", to: "C", direction: "none", attributes: {} },
            { id: "edge-2", from: "B", to: "C", attributes: {} },
            { id: "edge-3", from: "C", to: "D", direction: "none" },
          ],
        },
      },
    );
    t.ok(output.dot, "adaptor should return dot");
    const actual = output.dot;
    const expected = "graph G { \"A\" [\"label\"=\"A\"]; \"B\" []; \"C\" []; \"D\" []; \"A\" -- \"B\" [\"label\"=\"A to B\"]; \"A\" -- \"C\" []; \"B\" -- \"C\" []; \"C\" -- \"D\" ; }";
    t.same(actual, expected);
  });

});
