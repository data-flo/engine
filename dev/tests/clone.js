const fs = require("fs");
const path = require("path");

const { Datatable } = require("../../types/datatable");

async function main() {
  const filePath = path.resolve(__dirname, "..", "data", "amr-watch-metadata", "all.csv");

  const data = new Datatable(filePath);

  const clone = await data.clone();

  return clone.getSource();
}

main()
  .then(console.log)
  .catch(console.error);
