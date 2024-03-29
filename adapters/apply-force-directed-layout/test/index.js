const test = require("node:test");
const assert = require("node:assert");

const runAdaptor = require("../../../runner/run-adaptor.js");

const adaptor = require("../index.js");

test("apply-force-directed-layout adaptor", async (t) => {

  await t.test("given a graph, it should return a graph with x and y attributes", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "graph": {
          nodes: [
            { id: "A" },
            { id: "B" },
            { id: "C" },
            { id: "D" },
          ],
          edges: [
            { id: "edge-1", from: "A", to: "B", direction: "none", attributes: { label: "edge-0" } },
            { id: "edge-2", from: "A", to: "C", direction: "none", attributes: { label: "edge-1" } },
            { id: "edge-3", from: "B", to: "C", direction: "none", attributes: { label: "edge-2" } },
            { id: "edge-4", from: "C", to: "D", direction: "none", attributes: { label: "edge-3" } },
          ],
        },
        "stiffness": 3,
        "repulsion": 3,
      },
    );
    assert.ok(output.graph, "adaptor should return graph");
    for (const node of output.graph.nodes) {
      assert.ok(typeof node.attributes.x === "number");
      assert.ok(typeof node.attributes.y === "number");
    }
  });

});
