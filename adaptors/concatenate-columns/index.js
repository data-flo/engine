module.exports = async function (args) {
  if (args.columns.length < 2) {
    throw new Error("At least two columns are required");
  }

  await args.data.shouldIncludeColumns(args.columns);

  const data = await args.data.addColumnSync(
    args["concatenated column"],
    (row) => {
      const values = [];
      for (const column of args.columns) {
        values.push(row[column]);
      }
      const concatenated = values.join(args.separator);
      return concatenated;
    }
  );

  return { data };
};
