const test = require("node:test");
const assert = require("node:assert");

const runAdaptor = require("../../../runner/run-adaptor.js");

const adaptor = require("../index.js");

test("export-graph-to-dot-file adaptor", async (t) => {

  await test("given a graph, it should return a DOT file", async () => {
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
    assert.ok(output.dot, "adaptor should return dot");
    const actual = output.dot;
    const expected = "graph G { \"A\" [\"label\"=\"A\"]; \"B\" []; \"C\" []; \"D\" []; \"A\" -- \"B\" [\"label\"=\"A to B\"]; \"A\" -- \"C\" []; \"B\" -- \"C\" []; \"C\" -- \"D\" ; }";
    assert.equal(actual, expected);
  });

  await test("given a graph, it should return a DOT file", async () => {
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
            { id: "edge-0", from: "A", to: "B", direction: "forward", attributes: { label: "A to B" } },
            { id: "edge-1", from: "A", to: "C", direction: "none", attributes: {} },
            { id: "edge-2", from: "B", to: "C", attributes: {} },
            { id: "edge-3", from: "C", to: "D", direction: "none" },
          ],
        },
      },
    );
    assert.ok(output.dot, "adaptor should return dot");
    const actual = output.dot;
    const expected = "digraph G { \"A\" [\"label\"=\"A\"]; \"B\" []; \"C\" []; \"D\" []; \"A\" -> \"B\" [\"label\"=\"A to B\"]; \"A\" -- \"C\" []; \"B\" -- \"C\" []; \"C\" -- \"D\" ; }";
    assert.equal(actual, expected);
  });

});
