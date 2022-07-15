/* eslint-disable quotes */
const tap = require("../../utils/testing/unit");

const runAdaptor = require("../../runner/run-adaptor");
const adaptor = require("./index");

tap.test("import-epicollect-project", async () => {

  tap.test("given a csv text, it should return a databale", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        url: "https://five.epicollect.net/project/mr-demo",
      },
    );
    tap.ok(output.data, "adaptor should return data");
    tap.compareFile(
      output.data.getSource(),
      `"ec5_uuid","created_at","uploaded_at","title","1_name"\n"ab13ca80-0363-11ed-8cfe-d7b5b6bd3730","2022-07-14T10:56:52.521Z","2022-07-14T10:56:58.000Z","ab13ca80-0363-11ed-8cfe-d7b5b6bd3730","1"\n`,
    );
  });

});
