const test = require("node:test");
const assert = require("node:assert");

const { compareFile } = require("../../../utils/testing/unit.js");

const createTmpTextFile = require("../../../utils/file/tmp-text.js");
const createDatatable = require("../../../types/datatable.js");
const runAdaptor = require("../../../runner/run-adaptor.js");

const adaptor = require("../index.js");

test("transform-columns adaptor", async (t) => {
  const testCsvFilePath = await createTmpTextFile(`"number"
"1"
"-1"
"10"
`);

  assert.ok(process.env.OPENAI_API_KEY, "OPENAI_API_KEY is missing from env");

  await t.test("given a datatable, it should add a column", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "data": createDatatable(testCsvFilePath),
        "columns": ["number"],
        "system message": "You will be provided with a number, and your job is to return positive if the number is greater than zero, or negative if the number is less than zero.",
        "api token": process.env.OPENAI_API_KEY,
      },
    );
    assert.ok(output.data);
    compareFile(
      output.data.getSource(),
      `"number"
"positive"
"negative"
"positive"
`,
      true /* ignoreCase */,
    );
  });

});
