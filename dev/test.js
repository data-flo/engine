const fs = require("fs");
const path = require("path");
const { generate, parse, transform, stringify } = require ('csv');

async function main() {
  const parser = fs.createReadStream(path.resolve(__dirname, "data", "amr-watch-metadata", "ids.txt"))
    .pipe(
      parse({ columns: [ "id" ] })
    )

  for await (const record of parser) {
    console.log(record, typeof record)
    // Fake asynchronous operation
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
}

main()
  .then(console.log)
  .catch(console.error);
