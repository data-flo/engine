
export default async function (args) {
  const data = await args.data.addColumnSync(
    args["new column name"],
    (row) => row[args["column name"]],
  );

  return { data };
};

export { default as manifest } from "./manifest";
