const fs = require("node:fs");
const path = require("node:path");
const Filehound = require("filehound");

const getAdaptorExecutable = require("../runner/get-adaptor-executable.js");

function getAdaptorsList() {
  return (
    Filehound.create()
      .path(
        path.join(
          __dirname,
          "..",
          "adapters",
        )
      )
      .depth(1)
      .directory()
      .find()
      .then((subdirectories) =>
        subdirectories.map((dir) => {
          const name = path.basename(dir);
          return {
            name,
            manifest: getAdaptorExecutable(name).manifest,
          };
        })
      )
  );
}

async function main() {
  const list = await getAdaptorsList();
  const directory = {};

  const executables = [];

  for (const item of list) {
    console.info(item.name);
    directory[item.name] = item.manifest;
    for (const spec of item.manifest.input) {
      if (typeof spec.required !== "boolean") {
        throw new Error(`required is missing from ${spec.name}`);
      }
    }
    directory[item.name].name = item.name;
    executables.push(`module.exports["${item.name}"] = require("./adapters/${item.name}/index.js");`);
  }

  fs.writeFileSync(
    path.join(
      __dirname,
      "..",
      "manifest.json",
    ),
    JSON.stringify(
      directory,
    ),
  );

  fs.writeFileSync(
    path.join(
      __dirname,
      "..",
      "executables.js",
    ),
    executables.join("\n"),
  );
}

main()
  .catch(console.error);
