const tap = require("tap");

const adaptor = require("./index");
const runAdaptor = require("../../runner/run-adaptor");
const urlToId = require("../../utils/google-drive/folder-url-to-id");

tap.test("create-google-drive-folder adaptor", async () => {

  tap.test("given two text without separator, it should return the concatenated text", async (t) => {
    const output = await runAdaptor(
      adaptor,
      {
        "parent folder": "https://drive.google.com/drive/folders/1uK4_IidkKshVqVf8IrOHxOC_PLlQUPg9",
        "folder name": `test on ${new Date().toISOString()}`,
      },
    );
    t.ok(output.url, "adaptor should return url");
    t.ok(output.id, "adaptor should return id");
    t.equal(output.id, urlToId(output.url));
  });

});