const runAdaptor = require("../../runner/run-adaptor");
const tap = require("../../utils/testing/unit");

const adaptor = require("./index");

await t.test("import-file-from-dropbox adaptor", async () => {

  await t.test("given a Dropbox https URL, it should download it", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        url: "https://figshare.com/articles/dataset/Zhang_tree_BEAST_Fig2_tre/3380890",
      }
    );
    assert.ok(output.file, "adaptor should return file");
    assert.equal(output.file.name, "Zhang_tree_BEAST_Fig2.tre");
  });

});
