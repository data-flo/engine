import { fileURLToPath } from "url";
import { dirname } from "path";
import { generate, parse, transform, stringify } from "csv";

import createEngine from "../index";
import updateManifestSchema from "../manifest/index";
import data from "./data/amr-watch-metadata/index";

const { manifest, inputs } = data;

const __dirname = dirname(fileURLToPath(import.meta.url));

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

  const convertedManifest = await updateManifestSchema(manifest);

  const outputs = await engine.runDataflow(
    convertedManifest,
    inputs,
  );
  // console.log({ outputs })
  return outputs;
}

main()
  .then(console.log)
  .catch(console.error);
