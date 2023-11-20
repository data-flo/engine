const test = require("node:test");
const assert = require("node:assert");

const { compareFile } = require("../../../utils/testing/unit.js");

const runAdaptor = require("../../runner/run-adaptor");
const adaptor = require("./index");

test("import-file-from-smb-share adaptor", async (t) => {

  await t.test("given an URL, it should download it", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "share address": "\\\\localhost\\projects",
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
