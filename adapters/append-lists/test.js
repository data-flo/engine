/* eslint-disable quotes */
const tap = require("../../utils/testing/unit");

const runAdaptor = require("../../runner/run-adaptor");
const adaptor = require("./index");

tap.test("append-lists adaptor", async () => {

  tap.test("given two lists, it should return a merged list", async () => {
    const output = await runAdaptor(
      adaptor,
      {
        "first list": [ "1", "2" ],
        "second list": [ "3", "4" ],
      },
    );
    tap.ok(output.list, "adaptor should return list");
    tap.same(
      output.list,
      [ "1", "2", "3", "4" ],
    );
  });

});