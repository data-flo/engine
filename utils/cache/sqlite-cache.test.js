const test = require("node:test");
const assert = require("node:assert");

const cache = require("./sqlite-cache.js");

test("given an invalid string, it should return undefined", async (t) => {
  const key = "key1";
  await cache(
    key,
    () => {
      console.info("Calculating...");
      return { a: "value1" };
    },
  );

  assert.deepEqual(
    await cache(key),
    { a: "value1" },
  );

  assert.deepEqual(
    await cache(key),
    { a: "value1" },
  );

});
