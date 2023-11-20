const tap = require("../testing/unit");
const cache = require("./sqlite-cache");

await t.test("given an invalid string, it should return undefined", async (t) => {
  const key = "key1";
  await cache(
    key,
    () => {
      console.info("Calculating...");
      return { a: "value1" };
    },
  );

  t.same(
    await cache(key),
    { a: "value1" },
  );

  t.same(
    await cache(key),
    { a: "value1" },
  );

});
