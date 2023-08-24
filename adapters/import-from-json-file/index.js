const { Datatable } = require("../../types/datatable.js");
const jq = require("../../utils/jq.js");

module.exports = async function (args) {
  const contents = await args.json.getContents();

  const json = JSON.parse(contents);

  const dataWriter = await Datatable.create();

  const addRows = (rows) => {
    for (const row of rows) {
      dataWriter.write(row);
    }
  };

  if (args.filter) {
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
