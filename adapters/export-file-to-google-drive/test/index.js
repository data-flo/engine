const assert = require("node:assert");
const test = require("node:test");
const { loadEnv } = require("../../../utils/testing/unit.js");
const createTmpTextFile = require("../../../utils/file/tmp-text.js");
const createFile = require("../../../types/file.js");
const runAdaptor = require("../../../runner/run-adaptor.js");

const adaptor = require("../index.js");

loadEnv();
test("export-file-to-google-drive adaptor", async (t) => {
  assert.ok(process.env.GOOGLE_APPLICATION_CREDENTIALS, "GOOGLE_APPLICATION_CREDENTIALS is missing from env");

  let uploaded;

  await t.test("given a file, it should upload it", async () => {
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
    assert.ok(output.id, "adaptor should return id");
    assert.ok(output.url, "adaptor should return url");

    uploaded = output.url;
  });

  await t.test("given a file, it should update it", async () => {
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
    assert.ok(output.id, "adaptor should return id");
    assert.ok(output.url, "adaptor should return url");
  });

  await t.test("given an incorrect folder path, it should throw an error", async () => {
    const testFilePath = await createTmpTextFile(`(Bovine:0.69395,(Gibbon:0.0,(Orangutan:0.0,(Gorilla:0.0,(Chimp:0.0,Human:0.0)123:0.0)test:0.06124):0.0):0.54939,Mouse:1.21460);`);
    const file = createFile(testFilePath);
    const badFolderUrl = "https://drive.google.com/drive/folders/fdsfsafasdfasdfdsa-i03YI-2yd-2?usp=share_link";
    file.name = "tree.newick";
    file.mediaType = "text/plain";
    await assert.rejects(
      runAdaptor(
        adaptor,
        {
          "file": file,
          "folder url": badFolderUrl,
          "output file name": "text",
        }
      ),
      new Error(`Cannot access Google Drive folder ${badFolderUrl}. Make sure it exists and it has been shared with data-flo@data-flo.iam.gserviceaccount.com`)
    );
  });
});
