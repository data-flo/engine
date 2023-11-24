const test = require("node:test");
const assert = require("node:assert");
const path = require("node:path");

const { compareFile } = require("../../../utils/testing/unit.js");

const runAdaptor = require("../../../runner/run-adaptor.js");
const createFile = require("../../../types/file.js");
const adaptor = require("../index.js");

test("import-from-dbf-file adaptor", async (t) => {
  await t.test("given an dbf file, it should return a datatable", async () => {
    const file = path.resolve(__dirname, "..", "..", "..", "dev", "data", "time-difference.dbf");
    const output = await runAdaptor(
      adaptor,
      {
        "dbf": createFile(file),
      },
    );
    assert.ok(output.data, "adaptor should return data");
    compareFile(
      output.data.getSource(),
      "\"SAMPLE_ID\",\"SAMPLE_DAT\",\"RECEIPT_DA\",\"PATHOGEN\",\"TIME_DIFFE\"\n\"12356\",\"2023-01-23 00:00:00\",\"2023-01-23 00:00:00\",\"Staph aureus\",\"0\"\n\"52687\",\"2023-03-16 00:00:00\",\"2023-03-19 00:00:00\",\"Staph aureus\",\"3\"\n\"63284\",\"2022-01-15 00:00:00\",\"2023-01-15 00:00:00\",\"Staph aureus\",\"365\"\n\"10654\",\"2023-06-21 00:00:00\",\"2023-06-02 00:00:00\",\"Staph aureus\",\"-19\"\n\"36985\",\"2022-03-26 00:00:00\",\"2022-09-26 00:00:00\",\"Staph aureus\",\"184\"\n\"45812\",\"2023-05-02 00:00:00\",\"2023-06-22 00:00:00\",\"Staph aureus\",\"51\"\n\"65984\",\"2022-01-01 00:00:00\",\"2022-01-01 00:00:00\",\"Staph aureus\",\"0\"\n\"12364\",\"2023-02-01 00:00:00\",\"2023-02-23 00:00:00\",\"Staph aureus\",\"22\"\n\"56932\",\"2023-11-20 00:00:00\",\"2023-09-20 00:00:00\",\"Staph aureus\",\"-61\"\n",
    );
  });
});
