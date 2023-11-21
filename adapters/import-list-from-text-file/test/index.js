const test = require("node:test");
const assert = require("node:assert");

const createTmpTextFile = require("../../../utils/file/tmp-text.js");
const createFile = require("../../../types/file.js");
const runAdaptor = require("../../../runner/run-adaptor.js");

const adaptor = require("../index.js");

test("import-list-from-text-file adaptor", async (t) => {
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
        "column names": [
          [ "id", "asc" ],
        ],
      },
    );
    assert.ok(output.list, "adaptor should return list");
    assert.deepEqual(
      output.list,
      [
        "id,",
        "Human",
        "Gibbon",
        "Orangutan",
        "Gorilla",
        "Mouse",
        "Bovine",
      ]
    );
  });

});
