import tap  from "../../utils/testing/unit";
import runAdaptor  from "../../runner/run-adaptor";
import adaptor  from "./index";
import createTmpTextFile  from "../../utils/file/tmp-text";
import createFile  from "../../types/file";






tap.test("export-file-to-smb-share adaptor", async () => {
  const testFilePath = await createTmpTextFile(`(Bovine:0.69395,(Gibbon:0.0,(Orangutan:0.0,(Gorilla:0.0,(Chimp:0.0,Human:0.0)123:0.0)test:0.06124):0.0):0.54939,Mouse:1.21460);`);

  tap.test("given a file, it should upload it", async () => {
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
    tap.ok(output.file, "adaptor should return file");
    tap.compareFile(
      output.file.getSource(),
      "(Bovine:0.69395,(Gibbon:0.0,(Orangutan:0.0,(Gorilla:0.0,(Chimp:0.0,Human:0.0)123:0.0)test:0.06124):0.0):0.54939,Mouse:1.21460);",
    );
  });

  tap.test("given an existing file path, it should throw an error", async (t) => {
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
