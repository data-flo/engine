const tap = require("../../utils/testing/unit.js");

const createTmpTextFile = require("../../utils/file/tmp-text.js");
const createDatatable = require("../../types/datatable.js");
const runAdaptor = require("../../runner/run-adaptor.js");

const adaptor = require("./index.js");

tap.test("format-time-column adaptor", async () => {
  const testCsvFilePath = await createTmpTextFile(`"id","duration"
"1ms","1000"
"1hour","3600000"
`);

  tap.test("given a new column, it should add new values to the new column", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "data": createDatatable(testCsvFilePath),
        "original column": "duration",
        "original unit": "milliseconds",
        "new column": "duration in seconds",
        "new unit": "seconds",
      },
    );
    tap.ok(output.data, "adaptor should return data");
    tap.compareFile(
      output.data.getSource(),
      `"id","duration","duration in seconds"
"1ms","1000","1"
"1hour","3600000","3600"
`,
    );
  });

});
