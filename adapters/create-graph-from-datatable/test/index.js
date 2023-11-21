const test = require("node:test");
const assert = require("node:assert");

const createTmpTextFile = require("../../../utils/file/tmp-text.js");
const createDatatable = require("../../../types/datatable.js");
const runAdaptor = require("../../../runner/run-adaptor.js");

const adaptor = require("../index.js");

test("create-graph-from-datatable adaptor", async (t) => {
  const testCsvFilePath = await createTmpTextFile(`"source","target","label"
"A","B","edge-0"
"A","C","edge-1"
"B","C","edge-2"
"C","D","edge-3"
`);

  await t.test("given two columns, it should return concatenated text", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "data": createDatatable(testCsvFilePath),
        "from column": "source",
        "to column": "target",
      },
    );
    assert.ok(output.graph, "adaptor should return graph");
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
    assert.deepEqual(actual, expected);
  });

});
