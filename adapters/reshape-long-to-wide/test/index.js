const test = require("node:test");
const assert = require("node:assert");

const { compareFile } = require("../../../utils/testing/unit.js");
const createTmpTextFile = require("../../../utils/file/tmp-text.js");
const createDatatable = require("../../../types/datatable.js");
const runAdaptor = require("../../../runner/run-adaptor.js");

const adaptor = require("../index.js");

test("reshape-long-to-wide adaptor", async (t) => {

  await t.test("given a csv text, it should return a databale", async () => {
    const testCsvFilePath = await createTmpTextFile(
      `"subject","sex","condition","measurement"\n"1","M","control","7.9"\n"1","M","cond1","12.3"\n"1","M","cond2","10.7"\n"2","F","control","6.3"\n"2","F","cond1","10.6"\n"2","F","cond2","11.1"\n"3","F","control","9.5"\n"3","F","cond1","13.1"\n"3","F","cond2","13.8"\n"4","M","control","11.5"\n"4","M","cond1","13.4"\n"4","M","cond2","12.9"\n`,
    );
    const output = await runAdaptor(
      adaptor,
      {
        "data": createDatatable(testCsvFilePath),
        "key column name": "condition",
        "value column name": "measurement",
      },
    );
    assert.ok(output.data, "adaptor should return data");
    compareFile(
      output.data.getSource(),
      `"subject","sex","control","cond1","cond2"\n"1","M","7.9","12.3","10.7"\n"2","F","6.3","10.6","11.1"\n"3","F","9.5","13.1","13.8"\n"4","M","11.5","13.4","12.9"\n`
    );
  });

});
