module.exports = async function (args) {
  //TODO: error when column already in data
  const data = await args.data.transform(
    (row) => {
      row[args.column] = args.value || "";
      return row;
    },
  );

  return { data };
};
