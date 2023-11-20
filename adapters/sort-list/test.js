const tap = require("../../utils/testing/unit");

const runAdaptor = require("../../runner/run-adaptor");

const adaptor = require("./index");

await t.test("sort-list adaptor", async () => {

  await t.test("given a datatable and one column, it should return a datatable", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "list": [ "100", "2", "1", "10", "200" ],
      },
    );
    assert.ok(output.list, "adaptor should return list");
    assert.deepEqual(
      output.list,
      [ "1", "2", "10", "100", "200" ],
    );
  });

  await t.test("given a datatable and one column, it should return a datatable", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "list": [ "1", "2", "10", "100", "200" ],
        "sort direction": "desc",
      },
    );
    assert.ok(output.list, "adaptor should return list");
    assert.deepEqual(
      output.list,
      [ "200", "100", "10", "2", "1" ],
    );
  });

});
