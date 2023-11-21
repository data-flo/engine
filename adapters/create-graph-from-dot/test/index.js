const test = require("node:test");
const assert = require("node:assert");

const runAdaptor = require("../../../runner/run-adaptor.js");

const adaptor = require("../index.js");

test("create-graph-from-dot adaptor", async (t) => {

  await t.test("given a DOT string columns, it should return a graph", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "dot": `graph G { "A" [] [pos="100, 100"]; "B" [] [pos="200, 10, 30"]; "C" []; "D" []; "A" -> "B" [label="A to B"]; "A" -- "C" []; "B" -- "C" []; "C" -- "D" []; }`,
        "from column": "source",
        "to column": "target",
      },
    );
    assert.ok(output.graph, "adaptor should return graph");
    const actual = output.graph;
    const expected = {
      nodes: [
        { id: "A", label: "A", pos: "100, 100", x: 100, y: 100 },
        { id: "B", label: "B", pos: "200, 10, 30" },
        { id: "C", label: "C" },
        { id: "D", label: "D" },
      ],
      edges: [
        { id: "edge-0", from: "A", to: "B", direction: "forward", attributes: { label: "A to B" } },
        { id: "edge-1", from: "A", to: "C", direction: "none", attributes: {} },
        { id: "edge-2", from: "B", to: "C", direction: "none", attributes: {} },
        { id: "edge-3", from: "C", to: "D", direction: "none", attributes: {} },
      ],
    };
    assert.deepEqual(actual, expected);
  });

});
