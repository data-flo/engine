import fromString  from "../../utils/date/from-string";
import toString  from "../../utils/date/to-string";
import { EmptyString }  from "../../constants";
/* eslint no-restricted-globals: 0 */






export default async function (args) {
  await args.data.shouldIncludeColumns(
    args["original column name"],
  );

  const newColumnName = args["new column name"] || args["original column name"];

  const operationFunction = (
    args["original column name"] === newColumnName
      ?
      "modifyColumnSync"
      :
      "addColumnSync"
  );

  const data = await args.data[operationFunction](
    newColumnName,
    (row) => {
      const originalDate = fromString(
        row[args["original column name"]],
        args["original format"],
        args["original locale"],
      );
      if (originalDate) {
        return toString(
          originalDate,
          args["new format"],
          args["new locale"],
        );
      }
      else {
        return EmptyString;
      }
    },
  );

  return { data };
};

export { default as manifest } from "./manifest";
