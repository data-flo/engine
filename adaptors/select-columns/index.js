// const { transform } = require("csv");

const { Datatable } = require("../../types/datatable");

// module.exports = async function (args) {
//   const transformer = transform(
//     (inRow) => {
//       const outRow = {};
//       for (const columnName of args.columns) {
//         if (columnName in inRow) {
//           outRow[columnName] = inRow[columnName];
//         }
//       }
//       return outRow;
//     }
//   );

//   const inDataReader = await args.data.getReader();
//   const datatableWriter = await Datatable.create();

//   inDataReader
//     .pipe(transformer)
//     .pipe(datatableWriter);

//   const data = await datatableWriter.finalise();

//   return {
//     data,
//   };
// };

// module.exports = async function (args) {
//   const datatableWriter = await Datatable.create({ columns: args.columns });

//   args.data.getReader()
//     .pipe(datatableWriter);

//   const data = await datatableWriter.finalise();

//   return {
//     data,
//   };
// };

// module.exports = async function (args) {
//   const transformer = (inRow) => {
//     const outRow = {};
//     for (const columnName of args.columns) {
//       if (columnName in inRow) {
//         outRow[columnName] = inRow[columnName];
//       }
//     }
//     return outRow;
//   };

//   const data = await args.data.transform(transformer);

//   return {
//     data,
//   };
// };

module.exports = async function (args) {
  const datatableWriter = await Datatable.create();

  args.data.getPartialReader(args.columns)
    .pipe(datatableWriter);

  const data = await datatableWriter.finalise();

  return {
    data,
  };
};

module.exports.manifest = require("./manifest");
