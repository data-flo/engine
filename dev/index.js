const fs = require("fs");
const path = require("path");
const { generate, parse, transform, stringify } = require ('csv');

const Engine = require("../index.js");
const updateManifestSchema = require("../manifest/index.js");

// const { manifest, inputs } = require("./data/amr-watch-metadata/index.js");
const { manifest, inputs } = require("./data/cog-uk/index.js");

const engine = new Engine({});

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

  const convertedManifest = updateManifestSchema(manifest);

  const outputs = await engine.runDataflow(
    convertedManifest,
    inputs,
  );

  const formatMemoryUsage = (data) => `${Math.round(data / 1024 / 1024 * 100) / 100} MB`;

  const memoryData = process.memoryUsage();

  const memoryUsage = {
    rss: `${formatMemoryUsage(memoryData.rss)} -> Resident Set Size - total memory allocated for the process execution`,
    heapTotal: `${formatMemoryUsage(memoryData.heapTotal)} -> total size of the allocated heap`,
    heapUsed: `${formatMemoryUsage(memoryData.heapUsed)} -> actual memory used during the execution`,
    external: `${formatMemoryUsage(memoryData.external)} -> V8 external memory`,
  };

  outputs.memory = (memoryUsage);

  return outputs;
}

main()
  .then(console.info)
  .catch(console.error);
