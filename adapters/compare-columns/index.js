const { Datatable } = require("../../types/datatable");

module.exports = async function (args) {
  if (args.columns.length < 2) {
    throw new Error("At least two columns are required");
  }

  const sameWriter = await Datatable.create();
  const differentWriter = await Datatable.create();

  const sensitivity = (!args["case sensitive"]) ? "base" : undefined;

  for await (const row of args.data.getReader()) {
    let allColumnValuesAreSame = true;
    for (let index = 1; index < args.columns.length; index++) {
      const same = (
        row[args.columns[0]] === row[args.columns[index]]
        ||
        (
          row[args.columns[0]].toString
          &&
          row[args.columns[0]].toString().localeCompare(row[args.columns[index]], undefined, { sensitivity }) === 0
        )
      );
      if (!same)
      {
        allColumnValuesAreSame = false;
        break;
      }
    }

    if (allColumnValuesAreSame) {
      sameWriter.write(row);
    }
    else {
      differentWriter.write(row);
    }
  }

  sameWriter.end();
  differentWriter.end();

  const same = await sameWriter.finalise();
  const different = await differentWriter.finalise();

  return {
    same,
    different,
  };
};

module.exports.manifest = require("./manifest");
