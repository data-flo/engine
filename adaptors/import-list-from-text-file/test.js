import tap  from "../../utils/testing/unit";
import runAdaptor  from "../../runner/run-adaptor";
import adaptor  from "./index";
import createTmpTextFile  from "../../utils/file/tmp-text";
import createFile  from "../../types/file";







tap.test("import-list-from-text-file adaptor", async () => {
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
