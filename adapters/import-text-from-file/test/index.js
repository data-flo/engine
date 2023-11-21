const test = require("node:test");
const assert = require("node:assert");

const createTmpTextFile = require("../../../utils/file/tmp-text.js");
const createFile = require("../../../types/file.js");
const runAdaptor = require("../../../runner/run-adaptor.js");

const adaptor = require("../index.js");

test("import-text-from-file adaptor", async (t) => {
  const testFilePath = await createTmpTextFile(`id,
Human
Gibbon
Orangutan
Gorilla
Mouse
Bovine
`);

  await t.test("given a datatable and one column, it should return a datatable", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "file": createFile(testFilePath),
      },
    );
    assert.ok(output.text, "adaptor should return text");
    assert.deepEqual(
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
