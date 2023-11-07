const fs = require("fs");
const path = require("path");
const csv = require("fast-csv");

async function main() {
  fs.createReadStream(path.resolve(__dirname, "..", "data", "amr-watch-metadata", "all.csv"))
    .pipe(csv.parse({ headers: true }))
    // .on('error', error => console.error(error))
    // .on('data', row => console.debug(row))
    // .on('end', (rowCount) => console.debug(`Parsed ${rowCount} rows`));
    .pipe(csv.format({ headers: true }))
    .pipe(process.stdout);
}

main()
  .then(console.debug)
  .catch(console.error);
