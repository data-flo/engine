const fs = require("node:fs");
const path = require("node:path");
const Filehound = require("filehound");

const getAdaptorManifest = require("../runner/get-adaptor-manifest");

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
            manifest: getAdaptorManifest(name),
          };
        })
      )
  );
}

async function main() {
  const list = await getAdaptorsList();
  const directory = {};

  for (const item of list) {
    console.log(item.name);
    item.manifest.group = item.manifest.subgroup;
    item.manifest.subgroup = undefined;
    directory[item.name] = item.manifest;
  }

  fs.writeFileSync(
    path.join(
      __dirname,
      "..",
      "manifest.json",
    ),
    JSON.stringify(
      directory,
      null,
      2,
    ),
  );
}

main()
  .then(console.log);
