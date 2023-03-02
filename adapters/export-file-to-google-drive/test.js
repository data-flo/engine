const tap = require("../../utils/testing/unit");

const runAdaptor = require("../../runner/run-adaptor");
const adaptor = require("./index");
const createTmpTextFile = require("../../utils/file/tmp-text");
const createFile = require("../../types/file");

tap.test("export-file-to-google-drive adaptor", async () => {
  let uploaded;

  tap.test("given a file, it should upload it", async () => {
    const testFilePath = await createTmpTextFile(`(Bovine:0.69395,(Gibbon:0.0,(Orangutan:0.0,(Gorilla:0.0,(Chimp:0.0,Human:0.0)123:0.0)test:0.06124):0.0):0.54939,Mouse:1.21460);`);
    const file = createFile(testFilePath);
    file.name = "tree.newick";
    file.mediaType = "text/plain";
    const output = await runAdaptor(
      adaptor,
      {
        "file": file,
        "folder url": "https://drive.google.com/drive/folders/1oyq9qQpJPDtkDM7iBfar-i03YI-2yd-2?usp=share_link",
        "output file name": "text",
      }
    );
    tap.ok(output.id, "adaptor should return id");
    tap.ok(output.url, "adaptor should return url");

    uploaded = output.url;
  });

  tap.test("given a file, it should update it", async () => {
    const testFilePath = await createTmpTextFile(`n/a`);
    const file = createFile(testFilePath);
    // file.name = "tree.newick";
    // file.mediaType = "text/plain";
    const output = await runAdaptor(
      adaptor,
      {
        "file": file,
        "file url": uploaded,
        "output file name": "updated",
      }
    );
    tap.ok(output.id, "adaptor should return id");
    tap.ok(output.url, "adaptor should return url");

  });

});
