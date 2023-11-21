const test = require("node:test");
const assert = require("node:assert");

const { compareFile } = require("../../../utils/testing/unit.js");
const runAdaptor = require("../../../runner/run-adaptor.js");

const adaptor = require("../index.js");

test("import-epicollect-project", async (t) => {

  await t.test("given a csv text, it should return a datatable", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        url: "https://five.epicollect.net/project/mr-demo",
      },
    );
    assert.ok(output.data, "adaptor should return data");
    compareFile(
      output.data.getSource(),
      `"ec5_uuid","created_at","uploaded_at","title","1_name"\n"ab13ca80-0363-11ed-8cfe-d7b5b6bd3730","2022-07-14T10:56:52.521Z","2022-07-14T10:56:58.000Z","ab13ca80-0363-11ed-8cfe-d7b5b6bd3730","1"\n`,
    );
  });

});
