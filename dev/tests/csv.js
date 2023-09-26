const fs = require("fs");
const path = require("path");
const { generate, parse, transform, stringify } = require ('csv');

async function main() {
  fs.createReadStream(path.resolve(__dirname, "..", "data", "amr-watch-metadata", "all.csv"))
    .pipe(
      parse({ columns: true })
    )
    // .pipe(
    //   transform((record) => {
    //     // for (const key of Object.keys(record)) {
    //     //   record[key] = record[key].toUpperCase();
    //     // }
    //     return record;
    //   })
    // )
    .pipe(
      stringify({ header: true })
    )
    .pipe(fs.createWriteStream(path.resolve(__dirname, "..", "data", "amr-watch-metadata", "all'.csv")));
}

main()
  .then(console.info)
  .catch(console.error);
