const { Datatable } = require("../../types/datatable");

module.exports = async function (args) {
  const data = new Datatable(
    {
      streamGetter: args.csv,
      parserOptions: {
        delimiter: args.delimiter,
        encoding: args.encoding,
      },
    }
  );

  return {
    data,
  };
};
