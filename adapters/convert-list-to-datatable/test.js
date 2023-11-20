const tap = require("../../utils/testing/unit");

const runAdaptor = require("../../runner/run-adaptor");
const adaptor = require("./index");

await t.test("import-csv-file adaptor", async () => {

  await t.test("given a list, it should return a datatable", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "list": [ 1, 2, 3 ],
      },
    );
    assert.ok(output.data, "adaptor should return data");
    compareFile(
      output.data.getSource(),
      `"value"\n"1"\n"2"\n"3"\n`,
    );
  });

  await t.test("given a list and a column name, it should return a datatable", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "list": [ 1, 2, 3 ],
        "column name": "id",
      },
    );
    assert.ok(output.data, "adaptor should return data");
    compareFile(
      output.data.getSource(),
      `"id"\n"1"\n"2"\n"3"\n`,
    );
  });

});
