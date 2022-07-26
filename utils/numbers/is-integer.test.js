const tap = require("../testing/unit");
const isInteger = require("./is-integer");

tap.test("given a number, it should return true", async () => {
  const actual = isInteger(1);
  tap.same(actual, true);
});

tap.test("given a decimal, it should return true", async () => {
  const actual = isInteger(1.1);
  tap.same(actual, false);
});

tap.test("given a valid string, it should return true", async () => {
  const actual = isInteger("1");
  tap.same(actual, true);
});

tap.test("given an invalid string, it should return false", async () => {
  const actual = isInteger("A1");
  tap.same(actual, false);
});

tap.test("given an invalid string, it should return false", async () => {
  const actual = isInteger("123abc");
  tap.same(actual, false);
});
