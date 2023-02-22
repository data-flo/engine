
export default async function (args) {
  const columnsToKeep = (
    (await args.data.getColumns())
      .filter((x) => !args.columns.includes(x))
  );

  const data = await args.data.clone(columnsToKeep);

  return { data };
};

export { default as manifest } from "./manifest";
