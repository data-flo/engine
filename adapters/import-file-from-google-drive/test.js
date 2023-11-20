const runAdaptor = require("../../runner/run-adaptor");
const tap = require("../../utils/testing/unit");

const adaptor = require("./index");

await t.test("import-file-from-google-drive", async () => {

  await t.test("given a Google Drive file URL, it should download it", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        url: "https://drive.google.com/file/d/1AFKyykTj8sGzZaT81m3Ac_P2Tk1GCaAE/view?usp=sharing",
      }
    );
    assert.ok(output.file, "adaptor should return file");
    assert.equal(output.file.name, "test.txt");
    compareFile(
      output.file.getSource(),
      "Hello Data-flo!",
    );
  });

});
