const { Datatable } = require("../../types/datatable.js");

module.exports = async function (args) {
  const contents = await args.json.getContents();

  const json = JSON.parse(contents);

  const dataWriter = await Datatable.create();

  const addRows = (rows) => {
    const fields = new Set();
    for (const row of rows) {
      for (const [column, value] of Object.entries(row)) {
        if (value && typeof value === "object" && !Array.isArray(value)) {
          for (const [key, subValue] of Object.entries(value)) {
            const subcolumn = `${column} ${key}`;
            row[subcolumn] = subValue;
            fields.add(subcolumn);
          }
          delete row[column];
        }
        fields.add(column);
      }
    }

    for (const column of fields.keys()) {
      if (!(column in rows[0])) {
        rows[0][column] = "";
      }
    }

    for (const row of rows) {
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
