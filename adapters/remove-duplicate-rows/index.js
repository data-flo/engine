const crypto = require("crypto");

const { Datatable } = require("../../types/datatable");

module.exports = async function (args) {
  const columns = await args.data.getColumns();
  const dataWriter = await Datatable.create({ columns });
  const duplicatesWriter = await Datatable.create({ columns });

  const hashes = new Set();

  for await (const row of args.data.getReader()) {
    const hash = crypto.createHash("md5");
    for (const columnName of (args["column names"] || columns)) {
      if (args["case sensitive"] || typeof row[columnName] !== "string") {
        hash.update(row[columnName]);
      }
      else {
        hash.update(row[columnName].toLowerCase());
      }
    }
    const digest = hash.digest("hex");

    if (hashes.has(digest)) {
      duplicatesWriter.write(row);
    }
    else {
      dataWriter.write(row);
      hashes.add(digest);
    }
  }

  dataWriter.end();
  duplicatesWriter.end();

  const [ data, duplicates ] = await Promise.all([
    dataWriter.finalise(),
    duplicatesWriter.finalise(),
  ]);

  return {
    data,
    duplicates,
  };

};

module.exports.manifest = require("./manifest");
