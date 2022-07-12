const { test } = require("tap");

const runAdaptor = require("../../runner/run-adaptor");
const adaptor = require("./index");

test("find-value-in-list adaptor", async (t) => {

  await t.test("should find a text value in a list", async ({ same }) => {
    const result = await runAdaptor(
      adaptor,
      {
        list: ["red", "green", "blue"],
        pattern: "green",
      }
    );
    same(
      result,
      {
        value: "green",
        index: 2,
      }
    );
  });
  await t.test("should find a value in a list by using a regex", async ({ same }) => {
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
  await t.test("should not find a non-existing value in a list", async ({ same }) => {
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
