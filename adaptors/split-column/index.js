import makeRegexp  from "../../utils/text/make-regexp";

export default async function (args) {
  await args.data.shouldIncludeColumns(args["column name"]);

  const regex = makeRegexp(args.separator, true, true);

  const data = await args.data.transformSync(
    (row, { records }) => {
      if (records === 1) {
        for (const column of args["new column names"]) {
          row[column] = "";
        }
      }
      const value = row[args["column name"]];
      if (value) {
        const splits = value.toString().split(regex);
        for (let index = 0; index < args["new column names"].length && index < splits.length; index++) {
          row[args["new column names"][index]] = splits[index];
        }
      }
      return row;
    }
  );

  return { data };
};

export { default as manifest } from "./manifest";
