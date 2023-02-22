import makeRegexp  from "../../utils/text/make-regexp";

export default async function (args) {
  await args.data.shouldIncludeColumns(args.columns);

  const regex = makeRegexp("/^$/");

  const data = await args.data.transformSync(
    (row) => {
      for (const columnName of args.columns) {
        if (typeof row[columnName] === "string") {
          row[columnName] = row[columnName].replace(
            regex,
            args["new value"],
          );
        }
      }

      return row;
    }
  );

  return { data };
};

export { default as manifest } from "./manifest";
