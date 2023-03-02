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

  for (const item of list) {
    
  }

  fs.writeFileSync(
    path.join(
      __dirname,
      "..",
      "manifest.json",
    ),
    JSON.stringify(
      list,
      null,
      2
    ),
  );
}

main()
  .then(console.log);
