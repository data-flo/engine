const tap = require("tap");

const runAdaptor = require("../../runner/run-adaptor");
const createTmpTextFile = require("../../utils/file/tmp-text");
const createDatatable = require("../../types/datatable");

const adaptor = require("./index");

tap.test("create-graph-from-datatable adaptor", async () => {
  const testCsvFilePath = await createTmpTextFile(`"source","target","label"
"A","B","edge-0"
"A","C","edge-1"
"B","C","edge-2"
"C","D","edge-3"
`);

  tap.test("given two columns, it should return concatenated text", async (t) => {
    const output = await runAdaptor(
      adaptor,
      {
        "data": createDatatable(testCsvFilePath),
        "from column": "source",
        "to column": "target",
      },
    );
    t.ok(output.graph, "adaptor should return graph");
    const actual = output.graph;
    const expected = {
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
    };
    t.same(actual, expected);
  });

});
