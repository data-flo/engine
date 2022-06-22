const { transform } = require("csv");
const { finished } = require("stream/promises");

const { Datatable } = require("../../types/datatable");

module.exports = async function (args) {
  const transformer = transform(
    (inRow) => {
      const outRow = {};
      for (const columnName of args.columns) {
        if (columnName in inRow) {
          outRow[columnName] = inRow[columnName];
        }
      }
      return outRow;
    }
  );

  const data = new Datatable();

  const inDataReader = await args.data.getReader();
  const outDataWriter = await data.getWriter({ columns: args.columns });

  const outStream = inDataReader
    .pipe(transformer)
    .pipe(outDataWriter);

  return (
    finished(outStream)
      .then(() => ({ data }))
  );
};
