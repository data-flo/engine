
export default async function (args) {
  await args.data.shouldIncludeColumns(args["column name"]);

  const list = [];

  for await (const row of args.data.getPartialReader([ args["column name"] ])) {
    const value = row[args["column name"]];
    if (value !== null && value !== undefined && value !== "") {
      list.push(value);
    }
  }

  return { list };
};

export { default as manifest } from "./manifest";
