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

function generateAdaptorMarkdown(
  adaptorName,
  adaptorManifest,
) {
  const markdown = [];

  markdown.push(`# ${adaptorName}\n\n`);

  markdown.push(`## Inputs\n\n`);
  for (const spec of adaptorManifest.input) {
    markdown.push(`* \`${spec.name}\`\\\nType: \`${spec.type}\` Required: ${spec.required ? "Yes" : "No"}\\\n${spec.description.replace(/\n/g, " ")}\n`);
  }
  markdown.push(`\n\n`);

  markdown.push(`## Outputs\n\n`);
  for (const spec of adaptorManifest.output) {
    markdown.push(`* \`${spec.name}\`\\\nType: \`${spec.type}\`\\\n${spec.description.replace(/\n/g, " ")}\n`);
  }
  markdown.push(`\n\n`);

  return markdown.join("");
}

function mergeMarkdownDocs(
  originalDoc,
  update,
) {
  const [_, contentToKeep] = originalDoc.split("## Description\n");

  return [
    update,
    "## Description\n",
    contentToKeep,
  ].join("");
}

function processAdaptor(
  docsDir,
  adaptorName,
  adaptorManifest,
) {
  let markdown = generateAdaptorMarkdown(
    adaptorName,
    adaptorManifest,
  );

  const markdownFilePth = path.join(docsDir, "adaptors", `${adaptorName}.md`);

  if (fs.existsSync(markdownFilePth)) {
    markdown = mergeMarkdownDocs(
      fs.readFileSync(markdownFilePth, "utf8"),
      markdown
    );
  }

  fs.writeFileSync(
    markdownFilePth,
    markdown,
    "utf8",
  );
}

async function main() {
  const list = await getAdaptorsList();

  const docsDir = process.argv[2];

  for (const item of list) {
    console.info(item.name);
    processAdaptor(
      docsDir,
      item.name,
      item.manifest,
    );
  }
}

main()
  .catch(console.error);