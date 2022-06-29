module.exports = async function (args) {
  const data = await args.data.transform(
    (row) => {
      row[args.column] = args.value || "";
      return row;
    }
  );

  return { data };
};
