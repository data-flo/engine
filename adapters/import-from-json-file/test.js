const tap = require("../../utils/testing/unit.js");

const runAdaptor = require("../../runner/run-adaptor.js");
const adaptor = require("./index.js");

tap.test("import-from-microreact-project adaptor", async () => {
  tap.test("given a project, it should return a datatable", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "json": `
[
  { "id": 1, "label": "a" },
  { "id": 2, "label": "b" },
  { "id": 3, "label": "c" },
]
        `,
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

});
