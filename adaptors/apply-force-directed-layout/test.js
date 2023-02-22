import tap  from "../../utils/testing/unit";
import runAdaptor  from "../../runner/run-adaptor";
import adaptor  from "./index";
/* eslint-disable quotes */





tap.test("apply-force-directed-layout adaptor", async () => {

  tap.test("given a Newick string, it should return 7 leaf labels", async () => {
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
    tap.ok(output.graph, "adaptor should return graph");
    for (const node of output.graph.nodes) {
      tap.type(node.attributes.x, "number");
      tap.type(node.attributes.y, "number");
    }
  });

});
