const test = require("node:test");
const assert = require("node:assert");

const { compareFile } = require("../../../utils/testing/unit.js");
const createTmpTextFile = require("../../../utils/file/tmp-text.js");
const createDatatable = require("../../../types/datatable.js");
const runAdaptor = require("../../../runner/run-adaptor.js");
const urlToId = require("../../../utils/google-api/folder-url-to-id.js");

const adaptor = require("../index.js");

test("create-google-drive-folder adaptor", async (t) => {

  await t.test("given two text without separator, it should return the concatenated text", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "parent folder": "https://drive.google.com/drive/folders/1y02pVdbhd7b4qD7rbhxZxScF8EsW3ch4",
        "folder name": `test on ${new Date().toISOString()}`,
      },
    );
    assert.ok(output.url, "adaptor should return url");
    assert.ok(output.id, "adaptor should return id");
    assert.equal(output.id, urlToId(output.url));
  });

});
