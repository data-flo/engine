const tap = require("../testing/unit");
const isInteger = require("./is-integer");

await t.test("given a number, it should return true", async () => {
  const actual = isInteger(1);
  assert.deepEqual(actual, true);
});

await t.test("given a decimal, it should return true", async () => {
  const actual = isInteger(1.1);
  assert.deepEqual(actual, false);
});

await t.test("given a valid string, it should return true", async () => {
  const actual = isInteger("1");
  assert.deepEqual(actual, true);
});

await t.test("given an invalid string, it should return false", async () => {
  const actual = isInteger("A1");
  assert.deepEqual(actual, false);
});

await t.test("given an invalid string, it should return false", async () => {
  const actual = isInteger("123abc");
  assert.deepEqual(actual, false);
});
