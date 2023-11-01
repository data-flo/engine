const test = require("node:test");
const assert = require("node:assert");

const runAdaptor = require("../../runner/run-adaptor.js");
const { compareFile } = require("../../utils/testing/unit.js");

const adaptor = require("./index.js");

test("export-text-to-file adaptor", async (t) => {
  const text = `id,\nHuman\nGibbon\nOrangutan\nGorilla\nMouse\nBovine\n`;

  await t.test("given a text, it should return a text file", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "text": text,
      },
    );
    assert.ok(output.file, "adaptor should return file");
    assert.equal(output.file.name, "file.txt");
    assert.equal(output.file.mediaType, "text/plain");
    compareFile(
      output.file.getSource(),
      text,
    );
  });

  await t.test("given a text, it should return a text file", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "text": text,
        "output file name": "text-file.text",
      },
    );
    assert.ok(output.file, "adaptor should return file");
    assert.equal(output.file.name, "text-file.text");
    assert.equal(output.file.mediaType, "text/plain");
    compareFile(
      output.file.getSource(),
      text,
    );
  });
});
