const tap = require("../../utils/testing/unit");

const runAdaptor = require("../../runner/run-adaptor");
const adaptor = require("./index");

tap.test("import-file-from-smb-share adaptor", async () => {

  tap.test("given an URL, it should download it", async () => {
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
    tap.ok(output.file, "adaptor should return file");
    tap.equal(output.file.name, "demo.nwk");
    tap.compareFile(
      output.file.getSource(),
      "(Bovine:0.69395,(Gibbon:0.0,(Orangutan:0.0,(Gorilla:0.0,(Chimp:0.0,Human:0.0)123:0.0)test:0.06124):0.0):0.54939,Mouse:1.21460);",
    );
  });

});