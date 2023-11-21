const assert = require("node:assert");
const path = require("node:path");
const test = require("node:test");

const { compareFile, setupServices } = require("../../../utils/testing/unit.js");
const runAdaptor = require("../../../runner/run-adaptor.js");

const adaptor = require("../index.js");

test("import-file-from-smb-share adaptor", async (t) => {
  setupServices(path.resolve(__dirname));

  await t.test("given an URL, it should download it", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "share address": "\\\\localhost\\share",
        "file path": "data\\demo.nwk",
        "port": 8445,
        "username": "joe",
        "password": "samba",
      }
    );
    assert.ok(output.file, "adaptor should return file");
    assert.equal(output.file.name, "demo.nwk");
    compareFile(
      output.file.getSource(),
      "(Bovine:0.69395,(Gibbon:0.0,(Orangutan:0.0,(Gorilla:0.0,(Chimp:0.0,Human:0.0)123:0.0)test:0.06124):0.0):0.54939,Mouse:1.21460);",
    );
  });

});
