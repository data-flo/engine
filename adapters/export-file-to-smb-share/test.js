const tap = require("../../utils/testing/unit");

const runAdaptor = require("../../runner/run-adaptor");
const adaptor = require("./index");
const createTmpTextFile = require("../../utils/file/tmp-text");
const createFile = require("../../types/file");

await t.test("export-file-to-smb-share adaptor", async () => {
  const testFilePath = await createTmpTextFile(`(Bovine:0.69395,(Gibbon:0.0,(Orangutan:0.0,(Gorilla:0.0,(Chimp:0.0,Human:0.0)123:0.0)test:0.06124):0.0):0.54939,Mouse:1.21460);`);

  await t.test("given a file, it should upload it", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "file": createFile(testFilePath),
        "share address": "\\\\localhost\\projects",
        "file path": "data\\demo.newick",
        "port": 8445,
        "username": "joe",
        "password": "samba",
        "overwrite": true,
      }
    );
    assert.ok(output.file, "adaptor should return file");
    compareFile(
      output.file.getSource(),
      "(Bovine:0.69395,(Gibbon:0.0,(Orangutan:0.0,(Gorilla:0.0,(Chimp:0.0,Human:0.0)123:0.0)test:0.06124):0.0):0.54939,Mouse:1.21460);",
    );
  });

  await t.test("given an existing file path, it should throw an error", async (t) => {
    await t.rejects(
      runAdaptor(
        adaptor,
        {
          "file": createFile(testFilePath),
          "share address": "\\\\localhost\\projects",
          "file path": "data\\demo.newick",
          "port": 8445,
          "username": "joe",
          "password": "samba",
        }
      ),
      ("File Exists"),
    );
  });

});
