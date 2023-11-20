const tap = require("../../utils/testing/unit");

const runAdaptor = require("../../runner/run-adaptor");

const adaptor = require("./index");
const createTmpTextFile = require("../../utils/file/tmp-text");
const createFile = require("../../types/file");

await t.test("import-list-from-text-file adaptor", async () => {
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
