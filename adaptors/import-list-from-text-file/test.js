const tap = require("../../utils/testing/unit");

const runAdaptor = require("../../runner/run-adaptor");

const adaptor = require("./index");
const createTmpTextFile = require("../../utils/file/tmp-text");
const createFile = require("../../types/file");

tap.test("import-list-from-text-file adaptor", async () => {
  const testFilePath = await createTmpTextFile(`id,
Human
Gibbon
Orangutan
Gorilla
Mouse
Bovine
`);

  tap.test("given a datatable and one column, it should a sorted datatable", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "file": createFile(testFilePath),
        "column names": [
          [ "id", "asc" ],
        ],
      },
    );
    tap.ok(output.list, "adaptor should return list");
    tap.same(
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
