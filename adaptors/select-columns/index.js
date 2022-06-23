const { transform } = require("csv");

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

  const inDataReader = await args.data.getReader();
  const datatableWriter = await Datatable.create({ columns: args.columns });

  inDataReader
    .pipe(transformer)
    .pipe(datatableWriter);

  const data = await datatableWriter.finalise();

  return {
    data,
  };
};
