const tap = require("../../utils/testing/unit");

const runAdaptor = require("../../runner/run-adaptor");
const adaptor = require("./index");

tap.test("import-csv-file adaptor", async () => {

  tap.test("given a list, it should return a databale", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "list": [ 1, 2, 3 ],
      },
    );
    tap.ok(output.data, "adaptor should return data");
    tap.compareFile(
      output.data.getSource(),
      `"value"\n"1"\n"2"\n"3"\n`,
    );
  });

  tap.test("given a list and a column name, it should return a databale", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "list": [ 1, 2, 3 ],
        "column name": "id",
      },
    );
    tap.ok(output.data, "adaptor should return data");
    tap.compareFile(
      output.data.getSource(),
      `"id"\n"1"\n"2"\n"3"\n`,
    );
  });

});
