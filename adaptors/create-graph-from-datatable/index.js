
export default async function (args) {
  await args.data.shouldIncludeColumns(
    args["from column"],
    args["to column"],
  );

  // const attributeColumns = (
  //   (await args.data.getColumns())
  //     .filter((x) => x !== args.from && x !== args.to)
  // );

  const nodeIds = new Set();

  const edges = [];
  for await (const row of args.data.getReader()) {
    // const attributes = {};
    // for (const col of attributeColumns) {
    //   attributes[col] = row[col];
    // }
    nodeIds.add(row[args["from column"]]);
    nodeIds.add(row[args["to column"]]);
    edges.push({
      id: `edge-${edges.length + 1}`,
      from: row[args["from column"]],
      to: row[args["to column"]],
      direction: args.directed ? "forward" : "none",
      attributes: row,
    });
    delete row[args["from column"]];
    delete row[args["to column"]];
  }

  const nodes = [];
  for (const nodeId of nodeIds) {
    nodes.push({ id: nodeId });
  }

  return {
    graph: {
      nodes,
      edges,
    },
  };
};

export { default as manifest } from "./manifest";
