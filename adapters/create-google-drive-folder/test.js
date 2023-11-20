const tap = require("../../utils/testing/unit");

const adaptor = require("./index");
const runAdaptor = require("../../runner/run-adaptor");
const urlToId = require("../../utils/google-api/folder-url-to-id");

await t.test("create-google-drive-folder adaptor", async () => {

  await t.test("given two text without separator, it should return the concatenated text", async (t) => {
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
