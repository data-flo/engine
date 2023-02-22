import makeRegexp  from "../../utils/text/make-regexp";

export default async function (args) {
  await args.data.shouldIncludeColumns(Array.from(args.columns.keys));

  const regex = makeRegexp(args.pattern);

  const data = await args.data.transformSync(
    (row) => {
      for (const [ sourceColumn, targetColumn ] of args.columns.entries()) {
        if (typeof row[sourceColumn] === "string") {
          row[targetColumn || sourceColumn] = row[sourceColumn].replace(
            regex,
            args.replacement,
          );
        }
      }

      return row;
    }
  );

  return { data };
};

export { default as manifest } from "./manifest";
