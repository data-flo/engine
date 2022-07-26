const tap = require("../../utils/testing/unit");

const runAdaptor = require("../../runner/run-adaptor");

const adaptor = require("./index");

tap.test("sort-list adaptor", async () => {

  tap.test("given a datatable and one column, it should return a datatable", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "list": [ "100", "2", "1", "10", "200" ],
      },
    );
    tap.ok(output.list, "adaptor should return list");
    tap.same(
      output.list,
      [ "1", "2", "10", "100", "200" ],
    );
  });

  tap.test("given a datatable and one column, it should return a datatable", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "list": [ "1", "2", "10", "100", "200" ],
        "sort direction": "desc",
      },
    );
    tap.ok(output.list, "adaptor should return list");
    tap.same(
      output.list,
      [ "200", "100", "10", "2", "1" ],
    );
  });

});
