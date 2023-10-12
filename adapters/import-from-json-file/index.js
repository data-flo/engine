const { Datatable } = require("../../types/datatable.js");

module.exports = async function (args) {
  const contents = await args.json.getContents();

  const json = JSON.parse(contents);

  const dataWriter = await Datatable.create();

  const addRows = (rows) => {
    for (const row of rows) {
      for (const [column, value] of Object.entries(row)) {
        if (value && typeof value === "object" && !Array.isArray(value)) {
          for (const [key, subValue] of Object.entries(value)) {
            row[`${column} ${key}`] = subValue;
          }
          delete row[column];
        }
      }
      dataWriter.write(row);
    }
  };

  if (args.filter) {
    const jq = require("../../utils/jq.js");

    const filter = jq.compile(args.filter);
    for (const rows of filter(json)) {
      addRows(rows);
    }
  }
  else {
    addRows(json);
  }

  dataWriter.end();

  const data = await dataWriter.finalise();

  return { data };

};

module.exports.manifest = require("./manifest.js");
