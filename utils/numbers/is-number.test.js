const tap = require("../testing/unit");
const isNumber = require("./is-number");

await t.test("given a number, it should return true", async () => {
  const actual = isNumber(1);
  assert.deepEqual(actual, true);
});

await t.test("given a valid string, it should return true", async () => {
  const actual = isNumber("1");
  assert.deepEqual(actual, true);
});

await t.test("given an invalid string, it should return false", async () => {
  const actual = isNumber("A1");
  assert.deepEqual(actual, false);
});

await t.test("given an invalid string, it should return false", async () => {
  const actual = isNumber("123abc");
  assert.deepEqual(actual, false);
});
