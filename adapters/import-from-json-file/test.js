const tap = require("../../utils/testing/unit.js");

const runAdaptor = require("../../runner/run-adaptor.js");
const createTmpTextFile = require("../../utils/file/tmp-text.js");

const adaptor = require("./index.js");

tap.test("import-from-json-file adaptor", async () => {
  tap.test("given a json file, it should return a datatable", async () => {
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
    tap.ok(output.data, "adaptor should return data");
    tap.compareFile(
      output.data.getSource(),
      `"id","label"
"1","a"
"2","b"
"3","c"
`
    );
  });

  tap.test("given a json file, it should return a datatable", async () => {
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
    tap.ok(output.data, "adaptor should return data");
    tap.compareFile(
      output.data.getSource(),
      `"id","label"
"1",
"2","b"
"3","c"
`
    );
  });
});
