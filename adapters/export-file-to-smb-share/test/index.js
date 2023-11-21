const assert = require("node:assert");
const path = require("node:path");
const test = require("node:test");

const { compareFile, setupServices } = require("../../../utils/testing/unit.js");
const createTmpTextFile = require("../../../utils/file/tmp-text.js");
const createFile = require("../../../types/file.js");
const runAdaptor = require("../../../runner/run-adaptor.js");

const adaptor = require("../index.js");

test("export-file-to-smb-share adaptor", async (t) => {
  setupServices(path.resolve(__dirname));

  const testFilePath = await createTmpTextFile(`(Bovine:0.69395,(Gibbon:0.0,(Orangutan:0.0,(Gorilla:0.0,(Chimp:0.0,Human:0.0)123:0.0)test:0.06124):0.0):0.54939,Mouse:1.21460);`);

  await t.test("given a file, it should upload it", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "file": createFile(testFilePath),
        "share address": "\\\\localhost\\share",
        "file path": "demo.nwk",
        "port": 8445,
        "username": "joe",
        "password": "samba",
        "overwrite": true,
      }
    );
    assert.ok(output.file, "adaptor should return file");
    compareFile(
      path.resolve(__dirname, "share", "demo.nwk"),
      "(Bovine:0.69395,(Gibbon:0.0,(Orangutan:0.0,(Gorilla:0.0,(Chimp:0.0,Human:0.0)123:0.0)test:0.06124):0.0):0.54939,Mouse:1.21460);",
    );
  });

  await t.test("given an existing file path, it should throw an error", async () => {
    await assert.rejects(
      runAdaptor(
        adaptor,
        {
          "file": createFile(testFilePath),
          "share address": "\\\\localhost\\share",
          "file path": "demo.nwk",
          "port": 8445,
          "username": "joe",
          "password": "samba",
        }
      ),
      new Error("File Exists"),
    );
  });

});
