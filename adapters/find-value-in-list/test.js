const tap = require("../../utils/testing/unit");

const runAdaptor = require("../../runner/run-adaptor");
const adaptor = require("./index");

tap.test("find-value-in-list adaptor", async () => {

  await tap.test("should find a text value in a list", async () => {
    const result = await runAdaptor(
      adaptor,
      {
        list: ["red", "green", "blue"],
        pattern: "green",
      }
    );
    tap.same(
      result,
      {
        value: "green",
        index: 2,
      }
    );
  });
  await tap.test("should find a value in a list by using a regex", async ({ same }) => {
    const result = await runAdaptor(
      adaptor,
      {
        list: ["red", "green", "blue"],
        pattern: "/.*ue$/",
      }
    );
    same(
      result,
      {
        value: "blue",
        index: 3,
      }
    );
  });
  await tap.test("should not find a non-existing value in a list", async ({ same }) => {
    const result = await runAdaptor(
      adaptor,
      {
        list: ["red", "green", "blue"],
        pattern: "yellow",
      }
    );
    same(
      result,
      {
        value: null,
        index: null,
      }
    );
  });
});
