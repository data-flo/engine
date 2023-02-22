import makeRegexp  from "../../utils/text/make-regexp";
import { EmptyArray }  from "../../utils/constants";



export default async function (args) {
  const columnsToKeep = [ ...args["column names"] || EmptyArray ];

  if (args.pattern) {
    const regex = makeRegexp(args.pattern);
    for (const column of (await args.data.getColumns())) {
      if (regex.test(column)) {
        columnsToKeep.add(column);
      }
    }
  }

  const data = await args.data.clone(columnsToKeep);

  return { data };
};

export { default as manifest } from "./manifest";
