
export default async function createDatatable(args) {
  const columns = await args.data.getColumns();
  return { "column names": columns };
};

export { default as manifest } from "./manifest";
