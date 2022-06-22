const fs = require("fs");
const path = require("path");
const { generate, parse, transform, stringify } = require ('csv');

const createEngine = require("../index");

const { manifest, inputs } = require("./data/amr-watch-metadata/index");

const engine = createEngine({});

async function main() {

  // fs.createReadStream(path.resolve(__dirname, "data", "amr-watch-metadata", "abaumannii_20220401_V1.csv"))
  //   .pipe(
  //     parse({ columns: true })
  //   )
  //   .pipe(
  //     transform((record) => {
  //       for (const key of Object.keys(record)) {
  //         record[key] = "x" + record[key].toUpperCase();
  //       }
  //       return record;
  //     })
  //   )
  //   .pipe(
  //     stringify({ header: true })
  //   )
  //   .pipe(process.stdout);

  const outputs = await engine.runDataflow(
    manifest,
    inputs,
  );
  // console.log({ outputs })
  return outputs;
}

main()
  .then(console.log)
  .catch(console.error);
