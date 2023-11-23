const test = require("node:test");
const assert = require("node:assert");

const { compareFile } = require("../../../utils/testing/unit.js");
const runAdaptor = require("../../../runner/run-adaptor.js");

const adaptor = require("../index.js");

test("import-file-from-dropbox adaptor", async (t) => {
  await t.test("given a Dropbox URL, it should download it", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        // Uses dropbox@cgps.group, see vault
        url: "https://www.dropbox.com/scl/fi/0mgscez7f4a5yiwt60evu/data.csv?rlkey=8mn16kinhnf6uuayzjtfens8y&dl=0",
      }
    );
    assert.ok(output.file, "adaptor should return file");
    assert.equal(output.file.name, "data.csv");
    compareFile(
      output.file.getSource(),
      "id,name,location,number\r\n420,Thierry Henry,France,14\r\n",
    );
  });

  await t.test("given an invalid domain, it should throw an error", async () => {
    await assert.rejects(
      runAdaptor(
        adaptor,
        {
          url: "https://www.not-dropbox.com/scl/fi/0mgscez7f4a5yiwt60evu/data.csv?rlkey=8mn16kinhnf6uuayzjtfens8y&dl=0",
        }
      ),
      new Error("Invalid Dropbox file URL")
    );
  });
});
