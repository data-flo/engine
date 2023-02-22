
export default async function (args) {
  const data = await args.data.addColumnSync(
    args.column,
    () => args.value ?? "",
  );

  return { data };
};

export { default as manifest } from "./manifest";
