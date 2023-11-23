const test = require("node:test");
const assert = require("node:assert");

const runAdaptor = require("../../../runner/run-adaptor.js");
const adaptor = require("../index.js");

test("import-file-from-dropbox adaptor", async (t) => {
  await t.test("given a figshare https URL, it should download it", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        url: "https://figshare.com/articles/dataset/Zhang_tree_BEAST_Fig2_tre/3380890",
      }
    );
    assert.ok(output.file, "adaptor should return file");
    assert.equal(output.file.name, "Zhang_tree_BEAST_Fig2.tre");
  });
  await t.test("given an invalid domain, it should throw an error", async () => {
    await assert.rejects(
      runAdaptor(
        adaptor,
        {
          url: "https://not-figshare.com/articles/dataset/Zhang_tree_BEAST_Fig2_tre/3380890",
        }
      ),
      ("Invalid FigShare URL")
    );
  });
  await t.test("given an incorrect path, it should throw an error", async () => {
    await assert.rejects(
      runAdaptor(
        adaptor,
        {
          url: "https://figshare.com/articles/dataset/no-file",
        }
      ),
      ("Invalid FigShare URL")
    );
  });
});
