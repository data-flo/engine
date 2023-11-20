const tap = require("../../utils/testing/unit.js");

const runAdaptor = require("../../runner/run-adaptor.js");
const createTmpTextFile = require("../../utils/file/tmp-text.js");

const adaptor = require("./index.js");

await t.test("import-from-json-file adaptor", async () => {
  await t.test("given a json file, it should return a datatable", async () => {
    const testFilePath = await createTmpTextFile(`
    [
      { "id": 1, "label": "a" },
      { "id": 2, "label": "b" },
      { "id": 3, "label": "c" }
    ]
`);

    const output = await runAdaptor(
      adaptor,
      {
        "json": testFilePath,
      },
    );
    assert.ok(output.data, "adaptor should return data");
    compareFile(
      output.data.getSource(),
      `"id","label"
"1","a"
"2","b"
"3","c"
`
    );
  });

  await t.test("given a json file, it should return a datatable", async () => {
    const testFilePath = await createTmpTextFile(`
    [
      { "id": 1 },
      { "id": 2, "label": "b" },
      { "id": 3, "label": "c" }
    ]
`);

    const output = await runAdaptor(
      adaptor,
      {
        "json": testFilePath,
      },
    );
    assert.ok(output.data, "adaptor should return data");
    compareFile(
      output.data.getSource(),
      `"id","label"
"1",
"2","b"
"3","c"
`
    );
  });
});
