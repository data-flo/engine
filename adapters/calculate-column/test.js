const tap = require("../../utils/testing/unit.js");

const createTmpTextFile = require("../../utils/file/tmp-text.js");
const createDatatable = require("../../types/datatable.js");
const runAdaptor = require("../../runner/run-adaptor.js");

const adaptor = require("./index.js");

tap.test("format-time-column adaptor", async () => {
  const testCsvFilePath = await createTmpTextFile(`"a","b"
"1","3"
"2","4"
`);

  tap.test("given no operation, it should add values", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "data": createDatatable(testCsvFilePath),
        "left column": "a",
        "right column": "b",
        "result column": "c",
      },
    );
    tap.ok(output.data, "adaptor should return data");
    tap.compareFile(
      output.data.getSource(),
      `"a","b","c"
"1","3","4"
"2","4","6"
`,
    );
  });

});
