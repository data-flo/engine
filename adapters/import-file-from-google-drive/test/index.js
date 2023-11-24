const test = require("node:test");
const assert = require("node:assert");

const { compareFile } = require("../../../utils/testing/unit.js");
const runAdaptor = require("../../../runner/run-adaptor.js");

const adaptor = require("../index.js");

test("import-file-from-google-drive adaptor", async (t) => {
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

  await t.test("given an invalid domain, it should throw an error", async () => {
    await assert.rejects(
      runAdaptor(
        adaptor,
        {
          url: "https://drive.not-google.com/file/d/1AFKyykTj8sGzZaT81m3Ac_P2Tk1GCaAE/view?usp=sharing",
        }
      ),
      new Error("Invalid Google Drive URL.")
    );
  });
});
