const fs = require("fs");
const stream = require("stream");
const path = require("path");
const { generate, parse, transform, stringify } = require("csv");
// const asyncTransforms = require("async-transforms");

const Engine = require("../index.js");
const updateManifestSchema = require("../manifest/index.js");

// const { manifest, inputs } = require("./data/amr-watch-metadata/index.js");
const { manifest, inputs } = require("./data/500k/index.js");

const engine = new Engine({});

async function test() {
  // const parser =
  //   fs.createReadStream("/Users/ka10/code/data-flo/studio/files/ad/0e614f4d409de1649f139c0e19a39e354c2819")
  //     .pipe(
  //       parse({
  //         columns: (
  //           (headerCells) => headerCells.map((column) => column.trim())
  //         ),
  //         // record_delimiter: "\n",
  //         // delimiter: args.delimiter,
  //         // trim: args.trim,
  //       })
  //     );

  // Just serialize a object stream into lines of JSON
  function Serializer() {
    stream.Transform.call(this, { objectMode: true });
  }
  Serializer.prototype = Object.create(stream.Transform.prototype, { constructor: { value: Serializer } });
  Serializer.prototype._transform = function (chunk, encoding, done) {
    done(null, chunk);
  };

  // const transformer = new stream.Transform({
  //   transform: (chunk, encoding, next) => {
  //     next(null, chunk);
  //   },
  // });

  await stream.promises.pipeline(
    fs.createReadStream("/Users/ka10/code/data-flo/studio/files/ad/0e614f4d409de1649f139c0e19a39e354c2819"),
    parse({
      columns: (
        (headerCells) => headerCells.map((column) => column.trim())
      ),
    }),
    // asyncTransforms.map(async (x) => x),
    // transform(
    //   (record) => {
    //     return JSON.stringify(record);
    //   }
    // ),
    new Serializer(),
    stringify({
      header: true,
      quoted: true,
      bom: true,
    }),
    fs.createWriteStream("/Users/ka10/code/data-flo/studio/files/0"),
  );

  // for await (const record of parser) {
  // }

  return {};
}

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

  const outputs = await engine.runWorkflow(
    convertedManifest,
    inputs,
  );

  // const outputs = await test();

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
