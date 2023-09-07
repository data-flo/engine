const tap = require("../../utils/testing/unit.js");

const runAdaptor = require("../../runner/run-adaptor.js");

const createTmpTextFile = require("../../utils/file/tmp-text.js");
const createFile = require("../../types/file.js");

const adaptor = require("./index.js");

tap.test("import-text-from-file adaptor", async () => {
  const testFilePath = await createTmpTextFile(`id,
Human
Gibbon
Orangutan
Gorilla
Mouse
Bovine
`);

  tap.test("given a datatable and one column, it should return a datatable", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "file": createFile(testFilePath),
      },
    );
    tap.ok(output.text, "adaptor should return text");
    tap.same(
      output.text,
      `id,
Human
Gibbon
Orangutan
Gorilla
Mouse
Bovine
`,
    );
  });

});
